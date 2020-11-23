import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';

import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import AppError from '@shared/errors/AppError';

export default class SubjectController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const teachersRepository = new TeachersRepository();
    const teacher = await teachersRepository.findByUserId(request.user.id);

    if (!teacher) {
      throw new AppError('Teacher not found');
    }

    const createSubject = container.resolve(CreateSubjectService);

    const subject = await createSubject.execute({
      name,
      description,
      teacher_id: teacher.id,
    });

    return response.json(subject);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const teachersRepository = new TeachersRepository();
    const teacher = await teachersRepository.findByUserId(request.user.id);

    if (!teacher) {
      throw new AppError('Teacher not found');
    }

    const subjectsRepository = new SubjectsRepository();

    const subjects = await subjectsRepository.findAllByTeacherId(teacher.id);

    return response.json(subjects);
  }
}
