import { Router } from 'express';

import userRouter from './user.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/user', userRouter);

export default routes;
