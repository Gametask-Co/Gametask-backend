import { Request, Response, NextFunction } from 'express';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import AppError from '@shared/errors/AppError';

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;
  const { subject_id } = request.body;

  const subjectsRepository = new SubjectsRepository();
  const teachersRepository = new TeachersRepository();

  const teacher = await teachersRepository.findByUserId(user_id);

  if (!teacher) {
    throw new AppError('Teacher not found');
  }

  const subject = await subjectsRepository.isOwner(teacher.id, subject_id);

  if (!subject) {
    throw new AppError('Not enough permission');
  }

  return next();
}
