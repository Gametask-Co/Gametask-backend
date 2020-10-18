import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import StudentRepository from '../repositories/StudentRepository';

import CreateStudentService from '../services/CreateStudentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const studentRouter = Router();

studentRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user.id;

    const createStudentService = new CreateStudentService();

    const student = await createStudentService.execute({ id: user_id });

    return response.json(student);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

studentRouter.get('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user.id;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('User not found!');
    }

    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findByUserId(user_id);

    if (!student) {
      return response.status(400).json({ message: 'Not an Student!' });
    }

    return response.json({
      ...student,
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

studentRouter.delete('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user.id;

    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne(user_id);

    if (!userExists) {
      throw new Error('User not found!');
    }

    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findByUserId(user_id);

    if (!student) {
      return response.status(400).json({ message: 'Student not found!' });
    }

    await studentRepository.delete(student.id);

    return response.json({ message: 'ok' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default studentRouter;
