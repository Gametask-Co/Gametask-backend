import { getRepository, Repository } from 'typeorm';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import CreateSubjectDTO from '@modules/subjects/dtos/CreateSubjectDTO';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import AppError from '@shared/errors/AppError';

class SubjectRepository implements ISubjectsRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const subject = this.ormRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    return subject;
  }

  public async findAllByTeacherId(id: string): Promise<Subject[] | undefined> {
    const subjects = this.ormRepository.find({
      where: { teacher: id },
      relations: ['students'],
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

  public async findAllByUserId(id: string): Promise<Subject[] | undefined> {
    const teachersRepository = new TeachersRepository();
    const findTeacher = await teachersRepository.findByUserId(id);

    if (!findTeacher) {
      throw new AppError('Teacher not found!');
    }

    const findSubject = await this.ormRepository.find({
      where: { teacher: findTeacher.id },
      relations: ['students'],
    });

    return findSubject;
  }
}

export default SubjectRepository;
