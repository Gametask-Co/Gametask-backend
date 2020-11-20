import SubjectClass from '@modules/subjects/infra/typeorm/entities/SubjectClass';
import CreateSubjectClassDTO from '@modules/subjects/dtos/CreateSubjectClassDTO';

export default interface ISubjectClassesRepository {
  findById(id: string): Promise<SubjectClass | undefined>;
  create(data: CreateSubjectClassDTO): Promise<SubjectClass>;
  save(subject: SubjectClass): Promise<SubjectClass>;
}
