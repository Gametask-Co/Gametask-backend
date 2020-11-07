import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

export default interface CreateSubjectDTO {
  name: string;
  description: string;
  teacher: Teacher;
}
