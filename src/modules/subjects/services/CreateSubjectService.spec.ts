import 'reflect-metadata';

import connection from '@shared/helper/connection';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import { createTeacher } from '@shared/helper/testHelper';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

describe('CreateSubject', () => {
  let teachersRepository: ITeachersRepository;
  let teacher: Teacher;

  beforeAll(async () => {
    await connection.create();
    teachersRepository = new TeachersRepository();

    teacher = await createTeacher({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should create a new subject', async () => {
    const subjectsRepository = new SubjectsRepository();

    const createSubject = new CreateSubjectService(
      subjectsRepository,
      teachersRepository,
    );

    const subject = await createSubject.execute({
      name: 'Subject Test',
      description: 'Test',
      teacher_id: teacher.id,
    });

    expect(subject).toHaveProperty('id');
  });
});
