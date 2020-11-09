import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

class TeachersRepository implements ITeachersRepository {
  private teachers: Teacher[];

  private users: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.teachers = [];
    this.users = usersRepository;
  }

  public async findByUserId(id: string): Promise<Teacher | undefined> {
    const findTeacher = this.teachers.find(teacher => teacher.user_id === id);
    return findTeacher;
  }

  public async findById(id: string): Promise<Teacher | undefined> {
    const findTeacher = this.teachers.find(teacher => teacher.id === id);
    return findTeacher;
  }

  public async findByEmail(email: string): Promise<Teacher | undefined> {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new AppError('User not found!', 400);
    }

    const findTeacher = this.teachers.find(
      teacher => teacher.user_id === user.id,
    );

    return findTeacher;
  }

  public async create(userId: string): Promise<Teacher> {
    const teacher = new Teacher();
    Object.assign(teacher, { id: v4() }, { user_id: userId });
    this.teachers.push(teacher);

    return teacher;
  }

  public async save(teacher: Teacher): Promise<Teacher> {
    const findIndex = this.teachers.findIndex(
      findTeacher => findTeacher.id === teacher.id,
    );
    this.teachers[findIndex] = teacher;
    return teacher;
  }
}

export default TeachersRepository;
