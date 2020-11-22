import 'reflect-metadata';

import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';

import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/fakeSubjectsRepository';
import FakeTeachersRepository from '@modules/teachers/repositories/fakes/fakeTeachersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/fakeStudentsRepository';
import FakeMilestonesRepository from '@modules/subjects/repositories/fakes/fakeMilestonesRepository';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Student from '@modules/students/infra/typeorm/entities/Student';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import FakeBlocksRepository from '@modules/subjects/repositories/fakes/fakeBlocksRepository';
import CreateBlockService from '@modules/subjects/services/CreateBlockService';
import FakeTasksRepository from '@modules/subjects/repositories/fakes/fakeTasksRepository';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import Subject from '../infra/typeorm/entities/Subject';

import CreateMilestoneService from './CreateMilestoneService';
import IMilestonesRepository from '../repositories/IMilestoneRepository';
import Milestone from '../infra/typeorm/entities/Milestone';
import CreateTaskService from './CreateTaskService';
import IBlocksRepository from '../repositories/IBlocksRepository';
import Block from '../infra/typeorm/entities/Block';

describe('CreateTask', () => {
  let fakeUsersRepository: IUsersRepository;
  let fakeTeachersRepository: ITeachersRepository;
  let fakeSubjectsRepository: ISubjectsRepository;
  let fakeStudentsRepository: IStudentsRepository;
  let fakeMilestonesRepository: IMilestonesRepository;
  let fakeBlocksRepository: IBlocksRepository;
  let teacher: Teacher;
  let student: Student;
  let subject: Subject;
  let milestone: Milestone;
  let block: Block;

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

    fakeMilestonesRepository = new FakeMilestonesRepository();

    const createMilestoneService = new CreateMilestoneService(
      fakeMilestonesRepository,
      fakeSubjectsRepository,
    );

    milestone = await createMilestoneService.execute({
      subject_id: subject.id,
      name: 'Milestone Test',
      description: 'Description Test',
    });

    fakeBlocksRepository = new FakeBlocksRepository();

    const createBlockService = new CreateBlockService(
      fakeBlocksRepository,
      fakeMilestonesRepository,
    );

    block = await createBlockService.execute({
      name: 'Block name',
      milestone_id: milestone.id,
      subject_id: subject.id,
    });
  });

  it('Should create a Task', async () => {
    const fakeTasksRepository = new FakeTasksRepository();

    const createTaskService = new CreateTaskService(
      fakeTasksRepository,
      fakeBlocksRepository,
    );

    const response = await createTaskService.execute({
      block_id: block.id,
      name: 'Task Name',
      description: 'Task Description',
      total_score: 0,
      due: new Date(Date.now()),
      subject_id: subject.id,
    });

    expect(response).toHaveProperty('id');
  });
});
