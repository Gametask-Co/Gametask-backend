import 'reflect-metadata';

import AddStudentToSubjectByEmailService from '../../../modules/subjects/services/AddStudentToSubjectByEmailService';
import {
  createSubject,
  createStudent,
} from '../../../shared/helper/testHelper';
import Student from '../../../modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '../../../modules/students/repositories/IStudentsRepository';
import SubjectsRepository from '../../../modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import StudentsRepository from '../../../modules/students/infra/typeorm/repositories/StudentsRepository';
import connection from '../../../shared/helper/connection';
import ISubjectsRepository from '../../../modules/subjects/repositories/ISubjectsRepository';
import Subject from '../../../modules/subjects/infra/typeorm/entities/Subject';

import AddStudentToSubjectService from '../../../modules/subjects/services/AddStudentToSubjectService';

const studentExtraEmail = 'extrastudent@example.com';

describe('subjectStudent', () => {
  let subjectsRepository: ISubjectsRepository;
  let studentsRepository: IStudentsRepository;
  let student: Student;
  let studentExtra: Student;
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

    studentExtra = await createStudent({
      name: 'Extra Student',
      email: studentExtraEmail,
      password: '123123',
    });
  });

  describe('AddStudentToSubject', () => {
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

    it('Should add a student to a subject with students email', async () => {
      const addStudentToSubject = new AddStudentToSubjectByEmailService(
        subjectsRepository,
        studentsRepository,
      );

      const response = await addStudentToSubject.execute({
        subject_id: subject.id,
        student_email: studentExtraEmail,
      });

      expect(response).toHaveProperty('id');
      expect(response.students).toHaveLength(2);
    });
  });
});
