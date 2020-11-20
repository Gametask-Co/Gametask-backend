import CreateMilestoneDTO from '@modules/subjects/dtos/CreateMilestoneDTO';
import IMilestonesRepository from '@modules/subjects/repositories/IMilestoneRepository';
import { getRepository, Repository } from 'typeorm';
import Milestone from '../entities/Milestone';

class MilestonesRepository implements IMilestonesRepository {
  private ormRepository: Repository<Milestone>;

  constructor() {
    this.ormRepository = getRepository(Milestone);
  }

  public async findById(id: string): Promise<Milestone | undefined> {
    const milestone = this.ormRepository.findOne({
      where: { id },
      relations: ['blocks'],
    });

    return milestone;
  }

  public async create(data: CreateMilestoneDTO): Promise<Milestone> {
    const milestone = this.ormRepository.create(data);

    await this.ormRepository.save(milestone);
    return milestone;
  }

  public async save(milestone: Milestone): Promise<Milestone> {
    return this.ormRepository.save(milestone);
  }
}

export default MilestonesRepository;
