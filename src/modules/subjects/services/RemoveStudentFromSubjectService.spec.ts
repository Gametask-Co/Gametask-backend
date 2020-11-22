import 'reflect-metadata';

import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';

import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/fakeSubjectsRepository';
import FakeTeachersRepository from '@modules/teachers/repositories/fakes/fakeTeachersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/fakeStudentsRepository';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Student from '@modules/students/infra/typeorm/entities/Student';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import Subject from '../infra/typeorm/entities/Subject';
import AddStudentToSubjectService from './AddStudentToSubjectService';
import RemoveStudentFromSubjectService from './RemoveStudentFromSubjectService';

describe('RemoveStudentFromSubject', () => {
  let fakeUsersRepository: IUsersRepository;
  let fakeTeachersRepository: ITeachersRepository;
  let fakeSubjectsRepository: ISubjectsRepository;
  let fakeStudentsRepository: IStudentsRepository;
  let teacher: Teacher;
  let student: Student;
  let subject: Subject;

  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const user_teacher = await fakeUsersRepository.findByEmail(
      'johndoe@example.com',
    );

    fakeTeachersRepository = new FakeTeachersRepository(fakeUsersRepository);

    const createTeacher = new CreateTeacherService(
      fakeTeachersRepository,
      fakeUsersRepository,
    );

    teacher = await createTeacher.execute(user_teacher.id);

    fakeSubjectsRepository = new FakeSubjectsRepository();
    const createSubject = new CreateSubjectService(
      fakeSubjectsRepository,
      fakeTeachersRepository,
    );

    subject = await createSubject.execute({
      name: 'Subject Test',
      description: 'Test',
      teacher_id: teacher.id,
    });

    fakeUsersRepository.create({
      name: 'John Doe Student',
      email: 'johndoestudent@example.com',
      password: '123123',
    });

    const user_student = await fakeUsersRepository.findByEmail(
      'johndoestudent@example.com',
    );

    fakeStudentsRepository = new FakeStudentsRepository(fakeUsersRepository);

    const createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeUsersRepository,
    );

    student = await createStudent.execute({ id: user_student.id });

    const addStudentToSubject = new AddStudentToSubjectService(
      fakeSubjectsRepository,
      fakeStudentsRepository,
    );

    await addStudentToSubject.execute({
      subject_id: subject.id,
      student_id: student.id,
    });
  });

  it('Should remove a student from a subject', async () => {
    const removeStudentFromSubjectService = new RemoveStudentFromSubjectService(
      fakeTeachersRepository,
      fakeStudentsRepository,
      fakeSubjectsRepository,
    );

    const response = await removeStudentFromSubjectService.execute({
      teacher_id: teacher.id,
      student_id: student.id,
      subject_id: subject.id,
    });

    expect(response).toHaveProperty('id');
    expect(response.students).toHaveLength(0);
  });
});
