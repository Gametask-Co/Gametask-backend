import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/subjects/services/CreateTaskService';
import IndexTaskService from '@modules/subjects/services/IndexTaskService';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, attachment_url, due, block_id } = request.body;

    const createTaskService = container.resolve(CreateTaskService);

    const task = await createTaskService.execute({
      name,
      description,
      attachment_url,
      due,
      block_id,
    });

    return response.json(task);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const user_id = request.user.id;

    const indexTaskService = container.resolve(IndexTaskService);
    const task = await indexTaskService.execute({ task_id, user_id });

    return response.json(task);
  }
}
