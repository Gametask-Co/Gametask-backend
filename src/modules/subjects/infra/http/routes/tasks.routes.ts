import { Router } from 'express';

import ensureTeacherPermission from '@modules/subjects/infra/http/middlewares/ensureTeacherPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TasksController from '@modules/subjects/infra/controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/:task_id', ensureAuthenticated, tasksController.index);

tasksRouter.post(
  '/',
  ensureAuthenticated,
  ensureTeacherPermission,
  tasksController.create,
);

export default tasksRouter;
