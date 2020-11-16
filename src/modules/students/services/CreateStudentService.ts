import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  id: string;
}

@injectable()
class CreateStudentService {
  private studentsRepository: IStudentsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.studentsRepository = studentsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ id }: IRequestDTO): Promise<Student> {
    const userExists = await this.usersRepository.findById(id);

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
