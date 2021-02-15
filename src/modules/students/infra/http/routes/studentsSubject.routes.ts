import { Router } from 'express';

import StudentsSubjectController from '@modules/students/infra/controllers/studentsSubjectController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const studentsSubject = Router();
const studentsController = new StudentsSubjectController();

studentsSubject.post(
  '/:subjectCode',
  ensureAuthenticated,
  studentsController.create,
);

export default studentsSubject;
