import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import {
  createAndLoginAsStudent,
  createAndLoginAsTeacher,
  createSubject,
  getTeacher,
  joinStudentInSubject,
} from '@shared/helper/testHelper';
import User from '@modules/users/infra/typeorm/entities/User';

describe('Subjects', () => {
  let userToken: string;
  let user: User;
  let userStudentToken: string;
  let userStudent: User;

  beforeAll(async () => {
    await connection.create();
    const authenticateResponse = await createAndLoginAsTeacher({
      name: 'Test Example',
      email: 'test@gametask.com',
      password: 'test123',
    });

    userToken = authenticateResponse.token;
    user = authenticateResponse.user;

    const authenticateResponseStudent = await createAndLoginAsStudent({
      name: 'Student Example',
      email: 'student@gametask.com',
      password: 'test123',
    });

    userStudent = authenticateResponseStudent.user;
    userStudentToken = authenticateResponseStudent.token;
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
          background_url: 'subjectbg.png',
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
      expect(model.background_url).toEqual('subjectbg.png');
    });
  });

  describe('Index Subject', () => {
    it('Should get information about subject as a teacher', async () => {
      const teacher = await getTeacher({ teacher_id: user.teacher_id });
      const { subject } = await createSubject({
        subjectData: {
          name: 'Subject Test 2',
          description: 'Subject Description',
        },
        teacherData: teacher,
      });

      const response = await request(app)
        .get(`/subjects/${subject.id}`)
        .set('Authorization', `Bearer ${userToken}`);

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'name',
          'description',
          'teacher_id',
          'code',
          'students',
          'background_url',
          'id',
          'created_at',
          'updated_at',
        ]),
      );
      expect(model.code).not.toBeNull();
    });

    it('Should get information about subject as a student', async () => {
      const teacher = await getTeacher({ teacher_id: user.teacher_id });
      const { subject } = await createSubject({
        subjectData: {
          name: 'Subject Test 3',
          description: 'Subject Description',
        },
        teacherData: teacher,
      });

      await joinStudentInSubject({
        student_id: user.student_id,
        subject_id: subject.id,
      });

      const response = await request(app)
        .get(`/subjects/${subject.id}`)
        .set('Authorization', `Bearer ${userStudentToken}`);

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
          'students',
          'created_at',
          'updated_at',
        ]),
      );
      expect(Object.keys(model)).not.toContain('activities');
      expect(model.code).not.toBeNull();
    });
  });
});
