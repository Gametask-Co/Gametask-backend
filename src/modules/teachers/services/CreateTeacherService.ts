import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateTeacherService {
  private teachersRepository: ITeachersRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('TeachersRepository')
    teachersRepository: ITeachersRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.teachersRepository = teachersRepository;
    this.usersRepository = usersRepository;
  }

  public async execute(id: string): Promise<Teacher> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const teacherExists = await this.teachersRepository.findByUserId(
      userExists.id,
    );

    if (teacherExists) {
      throw new AppError('Already an teacher!');
    }

    const teacher = await this.teachersRepository.create(id);

    return teacher;
  }
}

export default CreateTeacherService;
