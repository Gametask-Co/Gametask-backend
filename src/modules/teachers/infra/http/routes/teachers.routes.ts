import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TeachersController from '@modules/teachers/infra/controllers/TeachersController';

const teachersRouter = Router();
const teachersController = new TeachersController();

teachersRouter.post('/', ensureAuthenticated, teachersController.create);

teachersRouter.get('/', ensureAuthenticated, teachersController.index);

// teacherRouter.delete('/', ensureAuthenticated, async (request, response) => {
//   const user_id = request.user.id;

//   const userRepository = getRepository(User);
//   const userExists = await userRepository.findOne(user_id);

//   if (!userExists) {
//     return response.status(400).json({ message: 'User not found!' });
//   }

//   const teacherRepository = getCustomRepository(TeacherRepository);
//   const teacher = await teacherRepository.findByUserId(user_id);

//   if (!teacher) {
//     return response.status(400).json({ message: 'Teacher not found!' });
//   }

//   await teacherRepository.delete(teacher.id);

//   return response.json({ message: 'ok' });
// });

export default teachersRouter;
