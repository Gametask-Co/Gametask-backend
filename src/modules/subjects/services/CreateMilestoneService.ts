import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CreateMilestoneDTO from '../dtos/CreateMilestoneDTO';
import Milestone from '../infra/typeorm/entities/Milestone';
import IMilestonesRepository from '../repositories/IMilestoneRepository';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class CreateMilestoneService {
  private milestonesRepository: IMilestonesRepository;

  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('MilestonesRepository')
    milestonesRepository: IMilestonesRepository,
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.milestonesRepository = milestonesRepository;
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    name,
    subject_id,
    description,
    isVisible,
    deadline,
  }: CreateMilestoneDTO): Promise<Milestone> {
    const findSubject = this.subjectsRepository.findById(subject_id);

    if (!findSubject) {
      throw new AppError('Subject not found');
    }

    const milestone = this.milestonesRepository.create({
      name,
      description,
      subject_id,
      isVisible,
      deadline,
    });

    return milestone;
  }
}

export default CreateMilestoneService;
