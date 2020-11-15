import { inject, injectable } from 'tsyringe';

import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
  name: string;
  description: string;
  teacher_id: string;
}

@injectable()
class CreateSubjectService {
  private subjectsRepository: ISubjectsRepository;

  private teachersRepository: ITeachersRepository;

  constructor(
    @inject('SubjectsRepository')
    subjectRepository: ISubjectsRepository,
    @inject('TeachersRepository')
    teachersRepository: ITeachersRepository,
  ) {
    this.subjectsRepository = subjectRepository;
    this.teachersRepository = teachersRepository;
  }

  public async execute({
    name,
    description,
    teacher_id,
  }: RequestDTO): Promise<Subject> {
    const teacher = await this.teachersRepository.findById(teacher_id);

    if (!teacher) {
      throw new AppError('Teacher or User not found!');
    }

    const subject = await this.subjectsRepository.create({
      name,
      description,
      teacher,
    });

    return subject;
  }
}

export default CreateSubjectService;
