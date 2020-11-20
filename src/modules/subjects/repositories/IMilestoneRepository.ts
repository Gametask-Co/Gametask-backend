import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';
import CreateMilestoneDTO from '../dtos/CreateMilestoneDTO';

export default interface IMilestonesRepository {
  findById(id: string): Promise<Milestone | undefined>;
  create(data: CreateMilestoneDTO): Promise<Milestone>;
  save(subject: Milestone): Promise<Milestone>;
}
