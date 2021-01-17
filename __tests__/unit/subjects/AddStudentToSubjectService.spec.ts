import 'reflect-metadata';

import {
  createSubject,
  createStudent,
} from '../../../src/shared/helper/testHelper';
import Student from '../../../src/modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '../../../src/modules/students/repositories/IStudentsRepository';
import SubjectsRepository from '../../../src/modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import StudentsRepository from '../../../src/modules/students/infra/typeorm/repositories/StudentsRepository';
import connection from '../../../src/shared/helper/connection';
import ISubjectsRepository from '../../../src/modules/subjects/repositories/ISubjectsRepository';
import Subject from '../../../src/modules/subjects/infra/typeorm/entities/Subject';

import AddStudentToSubjectService from '../../../src/modules/subjects/services/AddStudentToSubjectService';

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
