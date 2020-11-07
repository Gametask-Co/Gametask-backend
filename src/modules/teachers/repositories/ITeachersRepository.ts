import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

export default interface IUsersRepository {
  findByUserId(id: string): Promise<Teacher | undefined>;
  findById(id: string): Promise<Teacher | undefined>;
  findByEmail(email: string): Promise<Teacher | undefined>;
  create(id: string): Promise<Teacher>;
  save(teacher: Teacher): Promise<Teacher>;
}
