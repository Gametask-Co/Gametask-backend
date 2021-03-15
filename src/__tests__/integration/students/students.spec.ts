import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import {
  createAndLoginAsStudent,
  createSubject,
} from '@shared/helper/testHelper';
import User from '@modules/users/infra/typeorm/entities/User';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

describe('Students', () => {
  let userToken: string;
  let user: User;
  let subject: Subject;

  beforeAll(async () => {
    await connection.create();

    const subjectCreationResponse = await createSubject({
      userData: {
        email: 'teacher@gametask.com',
        password: 'test123',
        name: 'Teacher Example',
      },
      subjectData: {
        name: 'Subject Example',
        description: 'Description Example',
      },
    });

    subject = subjectCreationResponse.subject;

    const authenticateResponse = await createAndLoginAsStudent({
      name: 'Test Example',
      email: 'student@gametask.com',
      password: 'test123',
    });

    userToken = authenticateResponse.token;
    user = authenticateResponse.user;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('JoinSubject', () => {
    it('Should add student to subjects students', async () => {
      const response = await request(app)
        .post(`/students/subject/${subject.code}`)
        .set('Authorization', `Bearer ${userToken}`);

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
      expect(model.students).toHaveLength(1);
    });
  });
});
