import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubjectClasses from '@modules/subjects/services/CreateSubjectClassService';

export default class SubjectClassesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, block_id, subject_id, attachment_url } = request.body;

    const createSubjectClasses = container.resolve(CreateSubjectClasses);

    const block = await createSubjectClasses.execute({
      name,
      block_id,
      subject_id,
      attachment_url,
    });

    return response.json(block);
  }
}
