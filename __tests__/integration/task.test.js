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

        expect(response.body.task).toHaveProperty(
            'name',
            'description',
            'user_id',
            'createdAt'
        );
    });
});
