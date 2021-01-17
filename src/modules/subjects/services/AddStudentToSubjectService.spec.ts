import 'reflect-metadata';

import connection from '@shared/helper/connection';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import { createSubject, createStudent } from '@shared/helper/testHelper';
import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import Subject from '../infra/typeorm/entities/Subject';

import AddStudentToSubjectService from './AddStudentToSubjectService';

describe('AddStudentToSubject', () => {
  let subjectsRepository: ISubjectsRepository;
  let studentsRepository: IStudentsRepository;
  let student: Student;
  let subject: Subject;

  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  beforeAll(async () => {
    subjectsRepository = new SubjectsRepository();
    studentsRepository = new StudentsRepository();

    subject = await createSubject({
      userData: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
      },
      subjectData: {
        name: 'Subject Test',
        description: 'Test',
      },
    });

    student = await createStudent({
      name: 'Doe John',
      email: 'doejohn@example.com',
      password: '123123',
    });
  });

  it('Should add a student to a subject', async () => {
    const addStudentToSubject = new AddStudentToSubjectService(
      subjectsRepository,
      studentsRepository,
    );

    const response = await addStudentToSubject.execute({
      subject_id: subject.id,
      student_id: student.id,
    });

    expect(response).toHaveProperty('id');
    expect(response.students).toHaveLength(1);
  });
});
