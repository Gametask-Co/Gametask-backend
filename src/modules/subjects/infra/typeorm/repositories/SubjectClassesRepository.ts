import { getRepository, Repository } from 'typeorm';
import ISubjectClassesRepository from '@modules/subjects/repositories/ISubjectClassesRepository';
import SubjectClass from '@modules/subjects/infra/typeorm/entities/SubjectClass';
import CreateSubjectClassDTO from '@modules/subjects/dtos/CreateSubjectClassDTO';

class SubjectClassesRepository implements ISubjectClassesRepository {
  private ormRepository: Repository<SubjectClass>;

  constructor() {
    this.ormRepository = getRepository(SubjectClass);
  }

  public async findById(id: string): Promise<SubjectClass | undefined> {
    const subjectClass = await this.ormRepository.findOne({
      where: { id },
    });
    return subjectClass;
  }

  public async create(data: CreateSubjectClassDTO): Promise<SubjectClass> {
    const subjectClass = this.ormRepository.create(data);
    await this.ormRepository.save(subjectClass);
    return subjectClass;
  }

  public async save(subjectClass: SubjectClass): Promise<SubjectClass> {
    return this.ormRepository.save(subjectClass);
  }
}

export default SubjectClassesRepository;
