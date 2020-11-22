import { Router } from 'express';

import ensureTeacherPermission from '@modules/subjects/infra/http/middlewares/ensureTeacherPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BlocksController from '@modules/subjects/infra/controllers/BlocksController';

const blocksRouter = Router();
const blocksController = new BlocksController();

blocksRouter.post(
  '/',
  ensureAuthenticated,
  ensureTeacherPermission,
  blocksController.create,
);

export default blocksRouter;
