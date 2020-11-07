import Student from '@modules/students/infra/typeorm/entities/Student';

export default interface IStudentsRepository {
  findByUserId(id: string): Promise<Student | undefined>;
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  create(id: string): Promise<Student>;
  save(student: Student): Promise<Student>;
}
