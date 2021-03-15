import request from 'supertest';
import app from '@shared/infra/http/server';
import connection from '@shared/helper/connection';

import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';
import Block from '@modules/subjects/infra/typeorm/entities/Block';

import {
  createSubjectBlock,
  createTaskInExistingBlock,
  createAndLoginAsStudent,
  joinStudentInSubject,
} from '@shared/helper/testHelper';

describe('Student Activity', () => {
  let student_id: string;
  let userToken: string;
  let subject: Subject;
  let milestone: Milestone;
  let block: Block;

  beforeAll(async () => {
    await connection.create();

    const subjectCreationResponse = await createSubjectBlock({
      userData: {
        email: 'teacher@gametask.com',
        name: 'teacher',
        password: 'test123',
      },
      subjectData: {
        name: 'Subject Test',
        description: 'Subject test',
      },
      milestoneData: {
        name: 'Milestone Test',
        description: 'Milestone Test',
      },
      blockData: {
        name: 'Block Test',
      },
    });

    subject = subjectCreationResponse.subject;
    milestone = subjectCreationResponse.milestone;
    block = subjectCreationResponse.block;

    const studentCreation = await createAndLoginAsStudent({
      name: 'Student Example',
      email: 'student@gametask.com',
      password: 'test123',
    });

    student_id = studentCreation.user.student_id;
    userToken = studentCreation.token;

    await joinStudentInSubject({
      student_id,
      subject_id: subject.id,
    });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('Student Activity Creation', () => {
    it('Should create a new Student Activity in a task', async () => {
      const task = await createTaskInExistingBlock({
        blockData: block,
        taskData: {
          name: 'Task example',
        },
      });

      const response = await request(app)
        .post('/students/activity')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          student_id,
          subject_id: subject.id,
          milestone_id: milestone.id,
          block_id: block.id,
          task_id: task.id,
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'id',
          'student_id',
          'subject_id',
          'milestone_id',
          'block_id',
          'subjectclass_id',
          'task_id',
          'created_at',
          'updated_at',
        ]),
      );
    });

    it('Should not create a duplicated student activity', async () => {
      const task = await createTaskInExistingBlock({
        blockData: block,
        taskData: {
          name: 'Task example 2',
        },
      });

      await request(app)
        .post('/students/activity')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          student_id,
          subject_id: subject.id,
          milestone_id: milestone.id,
          block_id: block.id,
          task_id: task.id,
        });

      const response = await request(app)
        .post('/students/activity')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          student_id,
          subject_id: subject.id,
          milestone_id: milestone.id,
          block_id: block.id,
          task_id: task.id,
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(model.status).toBe('error');
      expect(model.message).toBe('Student activity already exists!');
    });
  });
});
