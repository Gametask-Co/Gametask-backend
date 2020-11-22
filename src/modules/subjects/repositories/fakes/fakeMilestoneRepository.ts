import { v4 } from 'uuid';
import CreateMilestoneDTO from '@modules/subjects/dtos/CreateMilestoneDTO';
import IMilestonesRepository from '@modules/subjects/repositories/IMilestoneRepository';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';

class MilestonesRepository implements IMilestonesRepository {
  private milestones: Milestone[];

  constructor() {
    this.milestones = [];
  }

  public async findById(id: string): Promise<Milestone | undefined> {
    const findMilestone = this.milestones.find(
      milestone => milestone.id === id,
    );
    return findMilestone;
  }

  public async create(data: CreateMilestoneDTO): Promise<Milestone> {
    const milestone = new Milestone();
    Object.assign(milestone, { id: v4() }, data);
    this.milestones.push(milestone);
    return milestone;
  }

  public async save(milestone: Milestone): Promise<Milestone> {
    const findIndex = this.milestones.findIndex(
      findMilestone => findMilestone.id === milestone.id,
    );
    this.milestones[findIndex] = milestone;
    return milestone;
  }
}

export default MilestonesRepository;
