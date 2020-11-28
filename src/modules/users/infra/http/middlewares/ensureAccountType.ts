import { Request, Response, NextFunction } from 'express';

import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

export default async function ensureAccountType(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;

  const teachersRepository = new TeachersRepository();
  const teacher = await teachersRepository.findByUserId(user_id);

  const studentsRepository = new StudentsRepository();
  const student = await studentsRepository.findByUserId(user_id);

  request.user = {
    ...request.user,
    teacher: teacher?.id,
    student: student?.id,
  };

  return next();
}
