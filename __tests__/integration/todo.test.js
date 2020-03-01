import request from 'supertest';
import app from '../../src/app';

describe('Todo', () => {

    it('should receive validation error', async () => {
        const user = await request(app)
            .post('/user/')
            .send({
                name: 'Test Todo',
                email: 'testtodo@gametask.com',
                birthday: '10/29/1995',
                password_hash: 'testtodo'
            });
        
        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });

        const response = await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task.body._id,
                nameee: 'Test Todo 1',
                describe: 'Test Todo Describe Example'
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    it('should create a task and todo in it', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        const response = await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });
        
        const task_new = await request(app)
            .get('/task/index')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id          
            });       

        expect(response.body).toHaveProperty('_id', 'name', 'description');
        expect(task_new.body.todo_list.includes(response.body._id)).toBeTruthy();
    });

    it('should receive todo list', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });
        
        await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 2',
                description: 'Test Todo Describe Example'
            });

        const response = await request(app)
            .get('/todo/list')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id 
            });

        expect(Array.isArray(response.body)).toBeTruthy();
    });
    
    it('should receive validation error', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });
        
         const response = await request(app)
            .get('/todo/list')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                tasks_id: task_id 
            });
        
        expect(response.body).toEqual({ message: 'Validation error' });
    });

    it('should receive single todo', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        const todo = await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });

        await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });
        
        const response = await request(app)
            .get('/todo/index')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                tasks_id: task_id,
                todo_id: todo.body._id
            });
        //provavel errado 
        expect(response.body).toEqual(todo.body._id);
    });

    it('should receive validation error', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        const todo = await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });

        await request(app)
            .post('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'Test Todo 1',
                description: 'Test Todo Describe Example'
            });
        
         const response = await request(app)
            .get('/todo/index')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                todo_id: todo.body._id
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    let task_id_deleted;

    it('should delete task', async () => {
        
    });

    it('should receive task not found', async () => {
        
    });


});
