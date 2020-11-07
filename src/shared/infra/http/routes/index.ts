import { Router } from 'express';

import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import UserRouter from '@modules/users/infra/http/routes/users.routes';
import TeachersRouter from '@modules/teachers/infra/http/routes/teachers.routes';
import StudentsRouter from '@modules/students/infra/http/routes/students.routes';
import SubjectsRouter from '@modules/subjects/infra/http/routes/subjects.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);
routes.use('/students', StudentsRouter);
routes.use('/teachers', TeachersRouter);
routes.use('/subjects', SubjectsRouter);

export default routes;
