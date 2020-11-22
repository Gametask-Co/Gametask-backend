import { Router } from 'express';

import ensureTeacherPermission from '@modules/subjects/infra/http/middlewares/ensureTeacherPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SubjectClassesController from '@modules/subjects/infra/controllers/SubjectClassesController';

const subjectClassesRouter = Router();
const subjectClassesController = new SubjectClassesController();

subjectClassesRouter.post(
  '/',
  ensureAuthenticated,
  ensureTeacherPermission,
  subjectClassesController.create,
);

export default subjectClassesRouter;
