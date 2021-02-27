import { Router } from 'express';

import ensureTeacherPermission from '@modules/subjects/infra/http/middlewares/ensureTeacherPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MilestoneValidator from '@modules/subjects/infra/validators/MilestoneValidator';
import MilestonesController from '../../controllers/MilestonesController';

const milestonesRouter = Router();
const milestoneController = new MilestonesController();
const milestoneValidator = new MilestoneValidator();

milestonesRouter.post(
  '/',
  ensureAuthenticated,
  ensureTeacherPermission,
  milestoneValidator.create,
  milestoneController.create,
);

export default milestonesRouter;
