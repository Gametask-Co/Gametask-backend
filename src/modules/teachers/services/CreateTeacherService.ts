import { getRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

@injectable()
class CreateTeacherService {
  private teachersRepository: ITeachersRepository;

  // TODO: APLICAR USERREPOSITORY COM SINGLETON
  constructor(
    @inject('TeachersRepository')
    teachersRepository: ITeachersRepository,
  ) {
    this.teachersRepository = teachersRepository;
  }

  public async execute(id: string): Promise<Teacher> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ id });

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
