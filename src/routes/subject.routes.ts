import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateSubjectService from '../services/CreateSubjectService';
import AddStudentToSubjectService from '../services/AddStudentToSubjectService';
import RemoveStudentFromSubjectService from '../services/RemoveStudentFromSubjectService';

import SubjectRepository from '../repositories/SubjectRepository';

const subjectRouter = Router();

subjectRouter.post('/', ensureAuthenticated, async (request, response) => {
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

subjectRouter.get('/', ensureAuthenticated, async (request, response) => {
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

subjectRouter.post(
  '/student',
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { subject_id, student_id } = request.body;

      const addStudentToSubjectService = new AddStudentToSubjectService();
      const subject = await addStudentToSubjectService.execute({
        subject_id,
        student_id,
      });

      return response.json(subject);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

subjectRouter.delete(
  '/student',
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { subject_id } = request.body;
      const user_id = request.user.id;

      const removeStudentFromSubjectService = new RemoveStudentFromSubjectService();
      await removeStudentFromSubjectService.execute({
        subject_id,
        user_id,
      });

      return response.json({ message: 'ok' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default subjectRouter;
