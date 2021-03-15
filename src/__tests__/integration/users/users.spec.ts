import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import { createUserAndLogin } from '@shared/helper/testHelper';

describe('Users', () => {
  let userToken: string;

  beforeAll(async () => {
    await connection.create();

    const creationUser = await createUserAndLogin({
      email: 'test2@gametask.com',
      name: 'Teste',
      password: 'test123',
    });

    userToken = creationUser.token;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateUser', () => {
    it('Should create a new user', async () => {
      const response = await request(app).post('/users').send({
        name: 'Test Example',
        email: 'test@gametask.com',
        password: 'test123',
      });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'email',
          'name',
          'avatar_url',
          'birthday',
          'gender',
          'teacher_id',
          'student_id',
          'id',
          'created_at',
          'updated_at',
        ]),
      );
    });
  });

  describe('IndexUser', () => {
    it('Should get user data', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`);

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'email',
          'birthday',
          'gender',
          'avatar_url',
          'teacher_id',
          'student_id',
          'created_at',
          'updated_at',
        ]),
      );
    });
  });
});
