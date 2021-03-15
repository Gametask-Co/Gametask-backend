import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import {
  createAndLoginAsTeacher,
  createSubject,
  getDateNow,
} from '@shared/helper/testHelper';

import User from '@modules/users/infra/typeorm/entities/User';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

describe('Milestones', () => {
  let userToken: string;
  let user: User;
  let teacher: Teacher;
  let subject: Subject;

  beforeAll(async () => {
    await connection.create();
    const authenticateResponse = await createAndLoginAsTeacher({
      name: 'Test Example',
      email: 'test@gametask.com',
      password: 'test123',
    });

    userToken = authenticateResponse.token;
    user = authenticateResponse.user;
    teacher = authenticateResponse.teacher;

    const subjectData = {
      name: 'Subject Test',
      description: 'Subject Test',
    };

    const subjectCreation = await createSubject({
      teacherData: teacher,
      subjectData,
    });

    subject = subjectCreation.subject;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateMilestone', () => {
    it('Should create a milestone', async () => {
      const response = await request(app)
        .post('/subjects/milestones')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Milestones Example',
          description: 'Milestones Description',
          subject_id: subject.id,
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'name',
          'description',
          'isVisible',
          'deadline',
          'subject_id',
          'id',
          'created_at',
          'updated_at',
        ]),
      );
      expect(model.isVisible).not.toBeTruthy();
    });

    it('Should create a milestone with deadline', async () => {
      const deadline = getDateNow();

      const response = await request(app)
        .post('/subjects/milestones')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Milestones Example',
          description: 'Milestones Description',
          deadline,
          subject_id: subject.id,
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'name',
          'description',
          'isVisible',
          'deadline',
          'subject_id',
          'id',
          'created_at',
          'updated_at',
        ]),
      );
      expect(model.isVisible).not.toBeTruthy();
      expect(model.deadline).not.toBeNull();
    });

    it('Should not create a milestone with older deadline than today', async () => {
      const deadline = new Date(Date.now());
      deadline.setDate(deadline.getDate() - 1);

      const response = await request(app)
        .post('/subjects/milestones')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Milestones Example',
          description: 'Milestones Description',
          subject_id: subject.id,
          deadline,
        });

      const model = response.body;
      expect(model.status).toBe('error');
    });
  });
});
