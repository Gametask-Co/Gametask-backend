import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateSubjectService from '../services/CreateSubjectService';

import SubjectRepository from '../repositories/SubjectRepository';

const userRouter = Router();

userRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { name, description } = request.body;
    const user_id = request.user.id;

    const createSubjectService = new CreateSubjectService();
    const subject = await createSubjectService.execute({
      name,
      description,
      user_id,
    });

    return response.json(subject);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.get('/', ensureAuthenticated, async (request, response) => {
  try {
    const user_id = request.user.id;

    const subjectRepository = getCustomRepository(SubjectRepository);

    const subjects = await subjectRepository.findAllSubjectByTeachersUserId(
      user_id,
    );

    return response.json(subjects);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
