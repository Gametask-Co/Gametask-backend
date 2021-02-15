import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import CreateSubjectDTO from '@modules/subjects/dtos/CreateSubjectDTO';

export default interface ISubjectsRepository {
  findAllByStudentId(id: string): Promise<Subject[] | undefined>;
  findAllByTeacherId(id: string): Promise<Subject[] | undefined>;
  findById(id: string): Promise<Subject | undefined>;
  findByCode(code: string): Promise<Subject | undefined>;
  create(data: CreateSubjectDTO): Promise<Subject>;
  save(subject: Subject): Promise<Subject>;
  isOwner(teacher_id: string, subject_id: string): Promise<Subject | undefined>;
}
