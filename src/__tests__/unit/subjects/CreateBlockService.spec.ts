import 'reflect-metadata';

import BlocksRepository from '../../../modules/subjects/infra/typeorm/repositories/BlocksRepository';
import MilestonesRepository from '../../../modules/subjects/infra/typeorm/repositories/MilestonesRepository';

import Subject from '../../../modules/subjects/infra/typeorm/entities/Subject';

import IMilestonesRepository from '../../../modules/subjects/repositories/IMilestoneRepository';
import Milestone from '../../../modules/subjects/infra/typeorm/entities/Milestone';
import CreateBlockService from '../../../modules/subjects/services/CreateBlockService';

import connection from '../../../shared/helper/connection';
import { createMilestone } from '../../../shared/helper/testHelper';

describe('Blocks', () => {
  let milestonesRepository: IMilestonesRepository;
  let subject: Subject;
  let milestone: Milestone;

  beforeAll(async () => {
    await connection.create();
    milestonesRepository = new MilestonesRepository();

    const milestoneCreation = await createMilestone({
      userData: {
        name: 'John Doe',
        email: 'johndoe@example.com',
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

    subject = milestoneCreation.subject;
    milestone = milestoneCreation.milestone;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateBlock', () => {
    it('Should create a block', async () => {
      const blocksRepository = new BlocksRepository();

      const createBlockService = new CreateBlockService(
        blocksRepository,
        milestonesRepository,
      );

      const response = await createBlockService.execute({
        name: 'Block name',
        milestone_id: milestone.id,
        subject_id: subject.id,
      });

      expect(response).toHaveProperty('id');
    });
  });
});
