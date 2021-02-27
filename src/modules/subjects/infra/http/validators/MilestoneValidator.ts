import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

import * as Yup from 'yup';

export default class MilestoneValidator {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const { subject_id, name, description, isVisible, deadline } = request.body;

    const data = { subject_id, name, description, isVisible, deadline };

    const schema = Yup.object().shape({
      subject_id: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().notRequired(),
      isVisible: Yup.boolean().notRequired(),
      deadline: Yup.date()
        .notRequired()
        .test('Deadline must be a future date', value => {
          if (value) {
            const today = new Date(Date.now()).setHours(0, 0, 0, 0);
            const testDate = new Date(value).setHours(0, 0, 0, 0);
            return testDate >= today;
          }
          return true;
        }),
    });

    try {
      await schema.validate(data);
    } catch (err) {
      throw new AppError(err, 422);
    }

    next();
  }
}
