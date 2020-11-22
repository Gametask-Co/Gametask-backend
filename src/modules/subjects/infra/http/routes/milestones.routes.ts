import { Router } from 'express';

import ensureTeacherPermission from '@modules/subjects/infra/http/middlewares/ensureTeacherPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MilestonesController from '../../controllers/MilestonesController';

const milestonesRouter = Router();
const milestoneController = new MilestonesController();

milestonesRouter.post(
  '/',
  ensureAuthenticated,
  ensureTeacherPermission,
  milestoneController.create,
);

export default milestonesRouter;
