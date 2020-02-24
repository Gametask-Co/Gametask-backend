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
                email: user2.body.user._id
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
                id: '5e533d45b8511c3e7aefa666'
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
                id: user2.body.user._id
            });

        expect(response.body).toEqual({ message: 'Succefully operation' });
    });

    it('should delete friendship', async () => {
        const user1 = await request(app)
            .post('/user/auth')
            .send({
                email: 'friend1@gametask.com',
                password: 'friend1'
            });

        const user2 = await request(app)
            .post('/user/auth')
            .send({
                email: 'friend2@gametask.com',
                password: 'friend2'
            });

        const response = await request(app)
            .delete('/friend')
            .set('Authorization', 'Bearer ' + user1.body.token)
            .send({
                id: user2.body.user._id
            });

        const user1_af = await request(app)
            .post('/user/auth')
            .send({
                email: 'friend1@gametask.com',
                password: 'friend1'
            });

        const user2_af = await request(app)
            .post('/user/auth')
            .send({
                email: 'friend2@gametask.com',
                password: 'friend2'
            });

        let flag1 = true,
            flag2 = true;

        Object.keys(user1_af.body.user.friend_list).forEach(function(key) {
            if (
                user1_af.body.user.friend_list[key].friend_id ==
                user2.body.user._id
            )
                flag1 = false;
        });

        if (user1_af.body.user.friend_list.includes(user2.body.user._id))
            flag1 = false;

        Object.keys(user2_af.body.user.friend_list).forEach(function(key) {
            if (
                user2_af.body.user.friend_list[key].friend_id ==
                user1.body.user._id
            )
                flag2 = false;
        });

        if (user2_af.body.user.friend_list.includes(user1.body.user._id))
            flag2 = false;

        expect(response.body).toEqual({ message: 'Succefully operation' });
        expect(flag1 && flag2).toBeTruthy();
    });
});
