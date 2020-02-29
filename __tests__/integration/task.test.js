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

		expect(response.body).toEqual({ message : 'Validation error' });
	});
	
    it('should receive task list', async () => {
        const user = await request(app)
            .post('/user/auth/')
            .send({
                email: 'tasktest@gametask.com',
                password: 'taskaccount'
            });
        
        const response = await request(app)
            .get('/task/')
            .set('Authorization', 'Bearer ' + user.body.token);
        expect(Array.isArray(response.body.tasks)).toBeTruthy();
    });
    
});
