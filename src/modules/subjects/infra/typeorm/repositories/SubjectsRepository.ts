import { getRepository, Repository } from 'typeorm';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import CreateSubjectDTO from '@modules/subjects/dtos/CreateSubjectDTO';

class SubjectRepository implements ISubjectsRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    return subject;
  }

  public async findAllByTeacherId(id: string): Promise<Subject[] | undefined> {
    const subjects = await this.ormRepository.find({
      where: { teacher_id: id },
      relations: ['students', 'milestones'],
    });
    return subjects;
  }

  public async create(data: CreateSubjectDTO): Promise<Subject> {
    const subject = this.ormRepository.create(data);

    await this.ormRepository.save(subject);
    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    return this.ormRepository.save(subject);
  }

  public async isOwner(
    teacher_id: string,
    subject_id: string,
  ): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({
      where: { id: subject_id, teacher_id },
      relations: ['students', 'milestones'],
    });
    return subject;
  }
}

export default SubjectRepository;
