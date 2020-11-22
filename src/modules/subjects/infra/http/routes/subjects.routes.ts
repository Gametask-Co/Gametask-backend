import { Router } from 'express';

import SubjectsController from '@modules/subjects/infra/controllers/SubjectsController';
import SubjectStudentsController from '@modules/subjects/infra/controllers/SubjectStudentsController';
import SubjectStudentsByEmailController from '@modules/subjects/infra/controllers/SubjectStudentsByEmailController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MilestonesRoutes from './milestones.routes';
import BlocksRoutes from './blocks.routes';
import TasksRoutes from './tasks.routes';
import SubjectClassesRoutes from './subjectclasses.routes';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();
const subjectStudentsController = new SubjectStudentsController();
const subjectStudentsByEmailController = new SubjectStudentsByEmailController();

subjectsRouter.post('/', ensureAuthenticated, subjectsController.create);

subjectsRouter.get('/', ensureAuthenticated, subjectsController.show);

// SubjectStudentsController

subjectsRouter.post(
  '/student',
  ensureAuthenticated,
  subjectStudentsController.create,
);

// SubjectStudentsByEmailController

subjectsRouter.post(
  '/student/email',
  ensureAuthenticated,
  subjectStudentsByEmailController.create,
);

// MILESTONES

subjectsRouter.use('/milestones', MilestonesRoutes);

// BLOCKS

subjectsRouter.use('/blocks', BlocksRoutes);

// TASKS

subjectsRouter.use('/tasks', TasksRoutes);

// SUBJECT CLASSES

subjectsRouter.use('/subjectclasses', SubjectClassesRoutes);
export default subjectsRouter;
