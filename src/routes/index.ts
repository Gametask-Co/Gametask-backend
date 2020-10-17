import { Router } from 'express';

import userRouter from './user.routes';
import sessionRouter from './session.routes';
import studentRouter from './student.routes';
import teacherRouter from './teacher.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/user', userRouter);
routes.use('/student', studentRouter);
routes.use('/teacher', teacherRouter);

export default routes;
