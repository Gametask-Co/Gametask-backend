import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBlockService from '@modules/subjects/services/CreateBlockService';

export default class BlocksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, milestone_id, subject_id } = request.body;

    const createBlockService = container.resolve(CreateBlockService);

    const block = await createBlockService.execute({
      name,
      milestone_id,
      subject_id,
    });

    return response.json(block);
  }
}
