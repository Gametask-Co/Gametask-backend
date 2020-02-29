import * as Yup from 'yup';

import User from '../models/User';
import Task from '../models/Task';

function isValidMongoDbID(str) {
    const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForValidMongoDbID.test(str);
}

function taskExist(task_list, task_id) {
    let flag = false;

    Object.keys(task_list).forEach(function(key) {
        if (task_list[key]._id == task_id) {
            flag = true;
        }
    });

    return flag;
}

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

    async index(req, res) {
        const { tasks } = await User.findById(req.userId);
        return res.send({ tasks });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            task_id: Yup.string().required()
        });

        const { task_id } = req.body;

        if (!(await schema.isValid(req.body)) || !isValidMongoDbID(task_id))
            return res.status(400).send({ message: 'Validation error' });

        const user = await User.findById(req.userId);
        let tasks = user.tasks;

        if (!taskExist(tasks, task_id))
            return res.status(400).send({ message: 'Task not found' });

        tasks = tasks.filter(id => {
            return id != task_id;
        });

        user.tasks = tasks;

        await user.updateOne(user);

        return res.send(user);
    }

    async get_todo(req, res) {
        return res.send({ ok: true });
    }
}

export default new TaskController();
