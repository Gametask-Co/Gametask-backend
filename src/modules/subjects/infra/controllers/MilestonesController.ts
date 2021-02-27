import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMilestoneService from '@modules/subjects/services/CreateMilestoneService';

export default class MilestonesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, subject_id, isVisible, deadline } = request.body;

    const createMilestoneService = container.resolve(CreateMilestoneService);

    const milestone = await createMilestoneService.execute({
      name,
      description,
      subject_id,
      isVisible,
      deadline,
    });

    return response.json(milestone);
  }
}
