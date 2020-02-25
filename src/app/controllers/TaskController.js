import * as Yup from 'yup';

import User from '../models/User';
import Task from '../models/Task';

class TaskController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
            due_date: Yup.date().notRequired()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).send({ message: 'Validation error' });

        req.body.user_id = req.userId;

        try {
            const task = await Task.create(req.body);
            const user = await User.findById(req.userId);
            user.tasks.push(task);
            await user.updateOne(user);

            return res.send({ task });
        } catch (err) {
            return res.status(400).send({ err });
        }
    }
}

export default new TaskController();
