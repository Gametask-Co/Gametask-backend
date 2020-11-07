import { Request, Response } from 'express';
import { container } from 'tsyringe';

import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import AppError from '@shared/errors/AppError';

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createStudent = container.resolve(CreateStudentService);

    const student = await createStudent.execute({ id: user_id });

    return response.json(student);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const studentRepository = new StudentsRepository();

    const student = await studentRepository.findByUserId(user_id);

    if (!student) {
      return response.status(400).json({ message: 'Not an Student!' });
    }

    return response.json({
      ...student,
      user_id: undefined,
      user: {
        ...user,
        password: undefined,
      },
    });
  }
}
