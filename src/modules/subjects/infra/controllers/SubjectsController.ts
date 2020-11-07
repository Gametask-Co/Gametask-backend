import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';

export default class SubjectController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const user_id = request.user.id;

    const createSubject = container.resolve(CreateSubjectService);

    const subject = await createSubject.execute({
      name,
      description,
      user_id,
    });

    return response.json(subject);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const subjectsRepository = new SubjectsRepository();

    const subjects = await subjectsRepository.findAllByUserId(id);

    return response.json(subjects);
  }
}
