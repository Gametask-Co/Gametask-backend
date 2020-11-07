import { injectable, inject } from 'tsyringe';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';
import User from '@modules/users/infra/typeorm/entities/User';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

interface IRequestDTO {
  id: string;
}

@injectable()
class CreateStudentService {
  private studentsRepository: IStudentsRepository;

  // TODO: APLICAR USERREPOSITORY COM SINGLETON
  constructor(
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository;
  }

  public async execute({ id }: IRequestDTO): Promise<Student> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ id });

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const studentExists = await this.studentsRepository.findByUserId(id);

    if (studentExists) {
      throw new AppError('Already an Student!');
    }

    const student = this.studentsRepository.create(id);

    return student;
  }
}

export default CreateStudentService;
