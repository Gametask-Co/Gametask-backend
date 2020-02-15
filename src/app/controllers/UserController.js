import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import * as Yup from 'yup';

import User from '../models/User';

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password_hash: Yup.string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).send({ message: 'Validation error' });
        }

        const { email } = req.body;
        const userExists = await User.findOne({ email });

        if (!userExists) {
            try {
                const user = await User.create(req.body);
                user.password_hash = undefined;

                return res.send({
                    user,
                    token: generateToken({ id: user.id })
                });
            } catch (err) {
                return res
                    .status(400)
                    .json({ message: 'Account creating error' });
            }
        }

        return res.status(400).json({ message: 'User already exists!' });
    }

    async auth(req, res) {
        const { email, password_hash } = req.body;

        const user = await User.findOne({ email }).select('+password_hash');

        if (
            !user ||
            !(await bcrypt.compare(password_hash, user.password_hash))
        ) {
            return res
                .status(400)
                .json({ message: 'User not found or Invalid password' });
        }

        user.password_hash = undefined;

        res.send({
            user,
            token: generateToken({ id: user.id })
        });
    }
}

export default new UserController();
