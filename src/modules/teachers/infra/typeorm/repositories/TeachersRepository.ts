import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

class TeachersRepository implements ITeachersRepository {
  private ormRepository: Repository<Teacher>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Teacher);
    this.usersRepository = getRepository(User);
  }

  public async findByUserId(id: string): Promise<Teacher | undefined> {
    const teacher = await this.ormRepository.findOne({
      where: { user_id: id },
    });
    return teacher;
  }

  public async findById(id: string): Promise<Teacher | undefined> {
    const teacher = await this.ormRepository.findOne(id);
    return teacher;
  }

  public async findByEmail(email: string): Promise<Teacher | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User not found!', 400);
    }

    const teacher = await this.ormRepository.findOne({
      where: { user_id: user.id },
    });

    return teacher;
  }

  public async create(userId: string): Promise<Teacher> {
    const user = this.ormRepository.create({ user_id: userId });
    await this.ormRepository.save(user);

    return user;
  }

  public async save(teacher: Teacher): Promise<Teacher> {
    return this.ormRepository.save(teacher);
  }
}

export default TeachersRepository;