import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CreateBlockDTO from '../dtos/CreateBlockDTO';
import Block from '../infra/typeorm/entities/Block';
import IBlocksRepository from '../repositories/IBlocksRepository';
import IMilestonesRepository from '../repositories/IMilestoneRepository';

@injectable()
class CreateBlockService {
  private blocksRepository: IBlocksRepository;

  private milestonesRepository: IMilestonesRepository;

  constructor(
    @inject('BlocksRepository')
    blocksRepository: IBlocksRepository,
    @inject('MilestonesRepository')
    milestonesRepository: IMilestonesRepository,
  ) {
    this.blocksRepository = blocksRepository;
    this.milestonesRepository = milestonesRepository;
  }

  public async execute({
    name,
    milestone_id,
    subject_id,
  }: CreateBlockDTO): Promise<Block> {
    const findMilestone = await this.milestonesRepository.findById(
      milestone_id,
    );

    if (!findMilestone) {
      throw new AppError('Milestone not found');
    }

    const block = await this.blocksRepository.create({
      name,
      milestone_id,
      subject_id,
    });
    return block;
  }
}

export default CreateBlockService;
