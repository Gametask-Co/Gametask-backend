import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import TeacherRepository from '../repositories/TeacherRepository';

import CreateTeacherService from '../services/CreateTeacherService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const teacherRouter = Router();

teacherRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user;

    const createTeacherService = new CreateTeacherService();
    const teacher = await createTeacherService.execute(user_id);

    return response.json({ teacher });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

teacherRouter.get('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user.id;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('User not found!');
    }

    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findByUserId(user_id);

    if (!teacher) {
      return response.status(400).json({ message: 'Teacher not found!' });
    }

    return response.json({
      ...teacher,
      user_id: undefined,
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

teacherRouter.delete('/', ensureAuthenticated, async (request, response) => {
  const user_id = request.user.id;

  const userRepository = getRepository(User);
  const userExists = await userRepository.findOne(user_id);

  if (!userExists) {
    return response.status(400).json({ message: 'User not found!' });
  }

  const teacherRepository = getCustomRepository(TeacherRepository);
  const teacher = await teacherRepository.findByUserId(user_id);

  if (!teacher) {
    return response.status(400).json({ message: 'Teacher not found!' });
  }

  await teacherRepository.delete(teacher.id);

  return response.json({ message: 'ok' });
});
export default teacherRouter;
