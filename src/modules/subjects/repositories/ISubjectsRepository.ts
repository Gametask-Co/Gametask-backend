import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import CreateSubjectDTO from '@modules/subjects/dtos/CreateSubjectDTO';

export default interface ISubjectsRepository {
  findAllByUserId(id: string): Promise<Subject[] | undefined>;
  findAllByTeacherId(id: string): Promise<Subject[] | undefined>;
  findById(id: string): Promise<Subject | undefined>;
  create(data: CreateSubjectDTO): Promise<Subject>;
  save(subject: Subject): Promise<Subject>;
}