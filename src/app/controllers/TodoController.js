import * as Yup from 'yup';

import User from '../models/User';
import Task from '../models/Task';
import Todo from '../models/Todo';

function isValidMongoDbID(str) {
    const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForValidMongoDbID.test(str);
}

function taskExist(task_list, task_id){
    return task_list.includes(task_id);
}

class TodoController {
    async store(req, res) {
        const schema = Yup.object().shape({
            task_id: Yup.string().required(),
            name: Yup.string().required(),
            description: Yup.string()
        });

        const user = await User.findById(req.userId);
        const tasks = user.tasks;
        const task_id = req.body.task_id;

        if (!(await schema.isValid(req.body)) || !isValidMongoDbID(task_id))
            return res.status(400).send({ message: 'Validation error' });
       
        if(!taskExist(tasks, task_id))
            return res.status(400).send({ message: 'Task not found' });
        
        const task = await Task.findById(task_id);
        let todo_list = task.todo_list;

        const todo = await Todo.create(req.body);
        todo_list.push(todo);
        
        task.todo_list = todo_list;
        await task.updateOne(task);

        return res.send(todo);
    }

    async index(req, res) {
        return res.send({ ok: true });
    }
    
    async list(req, res) {
        const schema = Yup.object().shape({
            task_id: Yup.string().required()
        });

        if(!(await schema.isValid(req.body)) || !isValidMongoDbID(task_id))
            return res.send({ message: 'Validation error' });
        
        return res.send({ ok: true });
    }
    async update(req, res) {
        return res.send({ ok: true });
    }

    async delete(req, res) {
        return res.send({ ok: true });
    }
}

export default new TodoController();
