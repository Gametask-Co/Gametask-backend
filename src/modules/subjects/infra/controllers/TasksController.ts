import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/subjects/services/CreateTaskService';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      attachment_url,
      due,
      block_id,
      subject_id,
    } = request.body;

    const createTaskService = container.resolve(CreateTaskService);

    const task = await createTaskService.execute({
      name,
      description,
      attachment_url,
      due,
      block_id,
      subject_id,
    });

    return response.json(task);
  }
}
