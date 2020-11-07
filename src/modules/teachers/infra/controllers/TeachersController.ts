import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';

import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const createTeacher = container.resolve(CreateTeacherService);

    const teacher = await createTeacher.execute(id);

    return response.json({ ...teacher, password: undefined });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const teachersRepository = new TeachersRepository();

    const teacher = await teachersRepository.findByUserId(id);

    if (!teacher) {
      return response.status(400).json({ message: 'Teacher not found!' });
    }

    return response.json({
      ...teacher,
    });
  }
}
