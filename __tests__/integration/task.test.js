import request from 'supertest';
import app from '../../src/app';

describe('Task', () => {
    it('should create a new task for a user', async () => {
        const user = await request(app)
            .post('/user/')
            .send({
                name: 'Task Test',
                email: 'tasktest@gametask.com',
                birthday: '10/09/2005',
                password_hash: 'taskaccount'
            });

        const response = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2005'
            });

        expect(response.body).toHaveProperty(
            'name',
            'description',
            'user_id',
            'createdAt'
        );
    });

    it('should receive validation error', async () => {
        const user = await request(app)
            .post('/user/auth/')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const response = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                namee: 'testes'
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });
    
    it('should receive single task', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2005'
            });

        let task_new = await request(app)
            .get('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task.body._id 
            });

        expect(task_new.body._id).toEqual(task.body._id);
    });

    let old_task_id;

    it('should delete task', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Task Example',
                description: 'Task Description Example',
                due_date: '01/01/2005'
            });
        
        const r_user = await request(app)
            .get('/user/')
            .set('Authorization', 'Bearer ' + user.body.token);

        let task_list = r_user.body.user.tasks;
        const task_id = task_list[0];
        old_task_id = task_id;

        await request(app)
            .delete('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: task_id
            });
        
        let response = await request(app)
            .get('/user/')
            .set('Authorization', 'Bearer ' + user.body.token);

        let task_list_new = response.body.user.tasks;
       
        expect(
            task_list.length > task_list_new.length ? true : false
        ).toBeTruthy();
        expect(task_list_new.includes(task_id)).toBeFalsy;
    });

    it('should receive task not found while trying to delete task', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const response = await request(app)
            .delete('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: old_task_id
            });

        expect(response.body).toEqual({ message: 'Task not found' });
    });

    it('should receive task validation error', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const response = await request(app)
            .delete('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: old_task_id + '0000'
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    it('should receive validation error', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const old_task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Test update task',
                description: 'Test update task',
                due_date: '10/10/2025'
            });
        
        const response = await request(app)
            .put('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                id: old_task.body._id + '666'
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    it('should receive Task not found', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const old_task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Test update task',
                description: 'Test update task',
                due_date: '10/10/2025'
            });
        
        await request(app)
            .delete('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                task_id: old_task.body._id
            });

        const response = await request(app)
            .put('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                _id: old_task.body._id,
                name: 'New name',
                description: 'New description',
            });

        expect(response.body).toEqual({ message: 'Task not found' });
    });

    it('should receive updated task', async () => {
        const user = await request(app)
            .post('/user/auth')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });

        const old_task = await request(app)
            .post('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                name: 'Test update task',
                description: 'Test update task',
                due_date: '10/10/2025'
            });

        const response = await request(app)
            .put('/task/')
            .set('Authorization', 'Bearer ' + user.body.token)
            .send({
                _id: old_task.body._id,
                name: 'New name',
                description: 'New description',
            });
        
        expect(response.body.name).toEqual('New name');
        expect(response.body.description).toEqual('New description');
    });
});
