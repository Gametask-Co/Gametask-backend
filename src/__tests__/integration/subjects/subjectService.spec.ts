import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import { createAndLoginAsTeacher } from '@shared/helper/testHelper';
import User from '@modules/users/infra/typeorm/entities/User';

describe('Users', () => {
  let userToken: string;
  let user: User;

  beforeAll(async () => {
    await connection.create();
    const authenticateResponse = await createAndLoginAsTeacher({
      name: 'Test Example',
      email: 'test@gametask.com',
      password: 'test123',
    });

    userToken = authenticateResponse.token;
    user = authenticateResponse.user;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateSubject', () => {
    it('Should create a new subject', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Subject Example',
          description: 'Subject Description',
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'name',
          'description',
          'teacher_id',
          'code',
          'background_url',
          'id',
          'created_at',
          'updated_at',
        ]),
      );
      expect(model.code).not.toBeNull();
    });
  });
});
