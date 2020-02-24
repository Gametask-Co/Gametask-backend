import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
    it('should give validation error', async () => {
        const user1 = await request(app)
            .post('/user')
            .send({
                name: 'Friend Test Valerror',
                email: 'friend_valerror@gametask.com',
                birthday: '10/11/1995',
                password_hash: 'friend1valerror'
            });

        const user2 = await request(app)
            .post('/user')
            .send({
                name: 'Friend Test 2 valerror',
                email: 'friend2_valerror@gametask.com',
                birthday: '10/11/1995',
                password_hash: 'friend2valerror'
            });

        const response = await request(app)
            .post('/friend')
            .set('Authorization', 'Bearer ' + user1.body.token)
            .send({
                id: user2.body.user._id
            });

        expect(response.body).toEqual({ message: 'Validation error' });
    });

    it('should give friend not found', async () => {
        const user1 = await request(app)
            .post('/user')
            .send({
                name: 'Friend Test 404',
                email: 'friend404@gametask.com',
                birthday: '10/11/1995',
                password_hash: 'friend1404'
            });

        const response = await request(app)
            .post('/friend')
            .set('Authorization', 'Bearer ' + user1.body.token)
            .send({
                id: '123456789999',
                email: 'friend404@gametask.com',
                name: 'friend 404'
            });

        expect(response.body).toEqual({ message: 'Friend not found' });
    });

    it('should create friend1, friend2 and add them to friendlist', async () => {
        const user1 = await request(app)
            .post('/user')
            .send({
                name: 'Friend Test',
                email: 'friend1@gametask.com',
                birthday: '10/11/1995',
                password_hash: 'friend1'
            });

        const user2 = await request(app)
            .post('/user')
            .send({
                name: 'Friend Test 2',
                email: 'friend2@gametask.com',
                birthday: '10/11/1995',
                password_hash: 'friend2'
            });

        const response = await request(app)
            .post('/friend')
            .set('Authorization', 'Bearer ' + user1.body.token)
            .send({
                id: user2.body.user._id,
                name: user2.body.user.name,
                email: user2.body.user.email
            });

        expect(response.body).toEqual({ message: 'Succefully operation' });
    });
});
