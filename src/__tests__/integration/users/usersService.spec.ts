import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

describe('Users', () => {
  beforeAll(async () => {
    await connection.create();
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
});
