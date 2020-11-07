import { Router } from 'express';
import SessionController from '@modules/users/infra/controller/SessionsController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
