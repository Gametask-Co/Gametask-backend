import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      email,
      birthday,
      gender,
      avatar_url,
      password,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      birthday,
      gender,
      avatar_url,
      password,
    });

    return response.json({ ...user, password: undefined });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.get('/', ensureAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ id });

    return response.json({ ...user, password: undefined });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.delete('/', ensureAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;

    const userRepository = getRepository(User);

    await userRepository.delete({ id });

    return response.json({ message: 'ok' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
