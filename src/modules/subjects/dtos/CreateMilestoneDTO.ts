import Subject from '../infra/typeorm/entities/Subject';

export default interface CreateMilestoneDTO {
  name: string;
  description: string;
  subject: Subject;
}
