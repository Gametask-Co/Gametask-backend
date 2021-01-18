import 'reflect-metadata';

import SubjectsRepository from '../../../modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import MilestonesRepository from '../../../modules/subjects/infra/typeorm/repositories/MilestonesRepository';

import ISubjectsRepository from '../../../modules/subjects/repositories/ISubjectsRepository';
import Subject from '../../../modules/subjects/infra/typeorm/entities/Subject';

import CreateMilestoneService from '../../../modules/subjects/services/CreateMilestoneService';

import connection from '../../../shared/helper/connection';
import { createSubject } from '../../../shared/helper/testHelper';

describe('Milestones', () => {
  let subjectsRepository: ISubjectsRepository;
  let subject: Subject;

  beforeAll(async () => {
    await connection.create();
    subjectsRepository = new SubjectsRepository();

    subject = await createSubject({
      userData: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
      },
      subjectData: {
        description: 'alguma descricao',
        name: 'algum nome',
      },
    });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('Creating milestones', () => {
    it('Should create a milestone', async () => {
      const milestonesRepository = new MilestonesRepository();

      const createMilestoneService = new CreateMilestoneService(
        milestonesRepository,
        subjectsRepository,
      );

      const response = await createMilestoneService.execute({
        subject_id: subject.id,
        name: 'Milestone Test',
        description: 'Description Test',
      });

      expect(response).toHaveProperty('id');
    });
  });
});
