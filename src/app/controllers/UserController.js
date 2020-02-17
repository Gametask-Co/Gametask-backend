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

        if (!(await schema.isValid(req.body)))
            return res.status(400).send({ message: 'Validation error' });

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
                    .send({ message: 'Account creating error' });
            }
        }

        return res.status(400).send({ message: 'User already exists!' });
    }

    async index(req, res) {
        const user = await User.findById(req.userId);

        return res.send({ user });
    }

    async update(req, res) {
        const user = await User.findById(req.userId).select('+password_hash');

        const { email, oldPassword } = req.body;

        if (email != user.email) {
            const userExists = await User.findOne({ email });

            if (userExists)
                return res.status(400).send({ message: 'Email already taken' });
        }

        //implementar troca de senha
        if (
            oldPassword &&
            !(await bcrypt.compare(oldPassword, user.password_hash))
        )
            return res.status(401).send({ message: 'Password does not match' });

        const { id, name } = await user.update(req.body);

        return res.send({
            id,
            name,
            email
        });
    }

    async delete(req, res) {
        const user = await user.findOne(req.userId);

        if (!user) return res.status(400).send({ message: 'User not found' });

        try {
            user.delete();
            return res.send({ message: 'Delete successfully' });
        } catch (err) {
            return res.send({ message: 'Error while deleting' });
        }
    }

    async auth(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).send({ message: 'Validation error' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password_hash');

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res
                .status(400)
                .send({ message: 'User not found or Invalid password' });
        }

        user.password_hash = undefined;

        res.send({
            user,
            token: generateToken({ id: user.id })
        });
    }
}

export default new UserController();
