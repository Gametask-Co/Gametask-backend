import { Router } from 'express';

import SessionRouter from './session.routes';
import UserRouter from './user.routes';
import StudentRouter from './student.routes';
import TeacherRouter from './teacher.routes';
import SubjectRouter from './subject.routes';

const routes = Router();

routes.use('/session', SessionRouter);
routes.use('/user', UserRouter);
routes.use('/student', StudentRouter);
routes.use('/teacher', TeacherRouter);
routes.use('/subject', SubjectRouter);

export default routes;
