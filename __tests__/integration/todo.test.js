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
            .get('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id          
            });       

        expect(response.body).toHaveProperty('_id', 'name', 'description');
        expect(task_new.body.todo_list.includes(response.body._id)).toBeTruthy();
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

        const response = await request(app)
            .get('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                _id: todo.body._id
            });

        expect(response.body._id).toEqual(todo.body._id);
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
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                name: 'task example',
                description: 'task description example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        const todo = await request(app)
            .post('/todo/')
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'test todo 1',
                description: 'test todo describe example'
            });

         const response = await request(app)
            .get('/todo/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                todo_id: todo.body._id + '666'
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    let todo_id_deleted;

    /*it('should delete a todo', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'testtodo@gametask.com',
                password: 'testtodo'
            });

        const task = await request(app)
            .post('/task/')
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                name: 'task example',
                description: 'task description example',
                due_date: '01/01/2025'
            });
        
        const task_id = task.body._id;

        const todo = await request(app)
            .post('/todo/')
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                task_id: task_id,
                name: 'test todo 1',
                description: 'test todo describe example'
            });
        
        const todo_id = todo.body._id;
        todo_id_deleted = todo_id;
        
        const response = await request(app)
            .delete('/todo/')
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                task_id: task_id,
                todo_id: todo_id
            });
    
        const not_found = await request(app)
            .get('/todo/')
            .set('authorization', 'bearer ' + user.body.token)
            .send({
                todo_id: todo_id
            });

        expect(response.body).toEqual({ message: 'Successfully delete' });
        expect(not_found.body).toEqual({ message: 'Todo not found' });
    };*/  
});
