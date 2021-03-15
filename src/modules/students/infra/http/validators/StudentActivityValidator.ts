import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

import * as Yup from 'yup';

export default class StudentActivityValidator {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      student_id,
      subject_id,
      milestone_id,
      block_id,
      subjectClass_id,
      task_id,
    } = request.body;

    const data = {
      student_id,
      subject_id,
      milestone_id,
      block_id,
      subjectClass_id,
      task_id,
    };

    const schema = Yup.object().shape({
      student_id: Yup.string().required(),
      subject_id: Yup.string().required(),
      milestone_id: Yup.string().required(),
      block_id: Yup.string().required(),
      subjectClass_id: Yup.string().notRequired(),
      task_id: Yup.string().notRequired(),
    });

    try {
      await schema.validate(data);
    } catch (err) {
      throw new AppError(err, 422);
    }

    next();
  }
}
