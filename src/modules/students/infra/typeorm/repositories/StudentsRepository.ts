import { Repository, getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import Student from '@modules/students/infra/typeorm/entities/Student';
import User from '@modules/users/infra/typeorm/entities/User';

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  private usersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Student);
    this.usersRepository = getRepository(User);
  }

  public async findByUserId(id: string): Promise<Student | undefined> {
    const findStudent = await this.ormRepository.findOne({
      where: { user_id: id },
    });
    return findStudent;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const userRepository = getRepository(User);
    const findUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new AppError('Student not found!', 400);
    }

    const findStudent = await this.ormRepository.findOne({
      where: {
        user_id: findUser.id,
      },
    });

    if (!findStudent) {
      throw new AppError('Student not found!', 400);
    }

    return findStudent;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne(id);
    return student;
  }

  public async create(id: string): Promise<Student> {
    const student = this.ormRepository.create({ user_id: id });
    await this.ormRepository.save(student);

    const user = await this.usersRepository.findOne({ where: { id } });
    user.student_id = student.id;
    await this.usersRepository.save(user);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }
}

export default StudentsRepository;
