import 'reflect-metadata';

import CreateSubjectClassService from '@modules/subjects/services/CreateSubjectClassService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import CreateMilestoneService from '@modules/subjects/services/CreateMilestoneService';
import CreateTaskService from '@modules/subjects/services/CreateTaskService';
import CreateBlockService from '@modules/subjects/services/CreateBlockService';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Block from '@modules/subjects/infra/typeorm/entities/Block';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import MilestonesRepository from '@modules/subjects/infra/typeorm/repositories/MilestonesRepository';
import SubjectClassesRepository from '@modules/subjects/infra/typeorm/repositories/SubjectClassesRepository';
import BlocksRepository from '@modules/subjects/infra/typeorm/repositories/BlocksRepository';
import TasksRepository from '@modules/subjects/infra/typeorm/repositories/TasksRepository';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import ISubjectClassesRepository from '@modules/subjects/repositories/ISubjectClassesRepository';
import IBlocksRepository from '@modules/subjects/repositories/IBlocksRepository';

import connection from '@shared/helper/connection';
import {
  createTeacher,
  createSubjectBlock,
  createSubject,
  createMilestone,
} from '@shared/helper/testHelper';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import IMilestonesRepository from '@modules/subjects/repositories/IMilestoneRepository';
import ITasksRepository from '@modules/subjects/repositories/ITasksRepository';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';

describe('Subject', () => {
  let teachersRepository: ITeachersRepository;
  let subjectsRepository: ISubjectsRepository;
  let milestonesRepository: IMilestonesRepository;
  let blocksRepository: IBlocksRepository;
  let subjectClassesRepository: ISubjectClassesRepository;
  let tasksRepository: ITasksRepository;

  // Subject tests
  let subjectTeacher: Teacher;

  // Blocks tests
  let blocksSubject: Subject;
  let blocksMilestone: Milestone;

  // Milestone tests
  let milestoneSubject: Subject;

  // SubjectClasses and Tasks tests
  let block: Block;
  let blockSubject: Subject;

  beforeAll(async () => {
    await connection.create();
    teachersRepository = new TeachersRepository();
    subjectsRepository = new SubjectsRepository();
    milestonesRepository = new MilestonesRepository();
    blocksRepository = new BlocksRepository();
    subjectClassesRepository = new SubjectClassesRepository();
    tasksRepository = new TasksRepository();

    subjectTeacher = await createTeacher({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const milestoneCreation = await createMilestone({
      userData: {
        name: 'John Doe',
        email: 'johndoeBlocks@example.com',
        password: '123123',
      },
      subjectData: {
        description: 'subject description',
        name: 'subject name',
      },
      milestoneData: {
        description: 'milestone description',
        name: 'milestone name',
      },
    });

    blocksSubject = milestoneCreation.subject;
    blocksMilestone = milestoneCreation.milestone;

    const subjectCreation = await createSubject({
      userData: {
        name: 'John Doe',
        email: 'johndoeMilestone@example.com',
        password: '123123',
      },
      subjectData: {
        description: 'alguma descricao',
        name: 'algum nome',
      },
    });

    milestoneSubject = subjectCreation.subject;

    const subjectBlock = await createSubjectBlock({
      userData: {
        email: 'johndoesubjectclasses@example.com',
        name: 'John Doe',
        password: '123123',
      },
      blockData: { name: 'Block' },
      milestoneData: { name: 'Milestone', description: 'Description' },
      subjectData: { name: 'Subject', description: 'Description' },
    });

    blockSubject = subjectBlock.subject;
    block = subjectBlock.block;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('Subject', () => {
    it('Should create a new subject', async () => {
      const createSubjectService = new CreateSubjectService(
        subjectsRepository,
        teachersRepository,
      );

      const subject = await createSubjectService.execute({
        name: 'Subject Test',
        description: 'Test',
        teacher_id: subjectTeacher.id,
      });

      expect(subject).toHaveProperty('id');
    });
  });

  describe('Milestones', () => {
    it('Should create a milestone', async () => {
      const createMilestoneService = new CreateMilestoneService(
        milestonesRepository,
        subjectsRepository,
      );

      const response = await createMilestoneService.execute({
        subject_id: milestoneSubject.id,
        name: 'Milestone Test',
        description: 'Description Test',
      });

      expect(response).toHaveProperty('id');
    });
  });

  describe('Blocks', () => {
    it('Should create a block', async () => {
      const createBlockService = new CreateBlockService(
        blocksRepository,
        milestonesRepository,
      );

      const response = await createBlockService.execute({
        name: 'Block name',
        milestone_id: blocksMilestone.id,
        subject_id: blocksSubject.id,
      });

      expect(response).toHaveProperty('id');
    });
  });

  describe('SubjectClasses', () => {
    it('Should create a subjectClass', async () => {
      const createSubjectClassService = new CreateSubjectClassService(
        subjectClassesRepository,
        blocksRepository,
      );

      const response = await createSubjectClassService.execute({
        name: 'Subject Class Name',
        block_id: block.id,
        subject_id: blockSubject.id,
      });

      expect(response).toHaveProperty('id');
    });
  });

  describe('Tasks', () => {
    it('Should create a Task', async () => {
      const createTaskService = new CreateTaskService(
        tasksRepository,
        blocksRepository,
      );

      const response = await createTaskService.execute({
        block_id: block.id,
        name: 'Task Name',
        description: 'Task Description',
        total_score: 0,
        due: new Date(Date.now()),
        subject_id: blockSubject.id,
      });

      expect(response).toHaveProperty('id');
    });
  });
});
