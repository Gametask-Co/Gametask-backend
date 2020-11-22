import { v4 } from 'uuid';
import ISubjectClassesRepository from '@modules/subjects/repositories/ISubjectClassesRepository';
import SubjectClass from '@modules/subjects/infra/typeorm/entities/SubjectClass';
import CreateSubjectClassDTO from '@modules/subjects/dtos/CreateSubjectClassDTO';

class SubjectClassesRepository implements ISubjectClassesRepository {
  private subjectClasses: SubjectClass[];

  constructor() {
    this.subjectClasses = [];
  }

  public async findById(id: string): Promise<SubjectClass | undefined> {
    const findSubjectClass = this.subjectClasses.find(
      subjectClass => subjectClass.id === id,
    );
    return findSubjectClass;
  }

  public async create(data: CreateSubjectClassDTO): Promise<SubjectClass> {
    const subjectClass = new SubjectClass();
    Object.assign(subjectClass, { id: v4() }, data);
    this.subjectClasses.push(subjectClass);
    return subjectClass;
  }

  public async save(subjectClass: SubjectClass): Promise<SubjectClass> {
    const findIndex = this.subjectClasses.findIndex(
      findSubjectClass => findSubjectClass.id === subjectClass.id,
    );
    this.subjectClasses[findIndex] = subjectClass;
    return subjectClass;
  }
}

export default SubjectClassesRepository;
