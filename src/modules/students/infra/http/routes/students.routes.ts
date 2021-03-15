import { Router } from 'express';

import StudentsController from '@modules/students/infra/controllers/studentsControllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StudentActivityController from '../../controllers/studentActivityController';
import StudentActivityValidator from '../validators/StudentActivityValidator';

const studentsRouter = Router();
const studentsController = new StudentsController();
const studentActivityController = new StudentActivityController();

const studentActivityValidator = new StudentActivityValidator();

studentsRouter.post('/', ensureAuthenticated, studentsController.create);

studentsRouter.get('/', ensureAuthenticated, studentsController.index);

studentsRouter.post(
  '/activity',
  ensureAuthenticated,
  studentActivityValidator.create,
  studentActivityController.create,
);

// studentRouter.delete('/', ensureAuthenticated, async (request, response) => {
//   try {
//     const user_id = request.user.id;

//     const userRepository = getRepository(User);
//     const userExists = await userRepository.findOne(user_id);

//     if (!userExists) {
//       throw new Error('User not found!');
//     }

//     const studentRepository = getCustomRepository(StudentRepository);

//     const student = await studentRepository.findByUserId(user_id);

//     if (!student) {
//       return response.status(400).json({ message: 'Student not found!' });
//     }

//     await studentRepository.delete(student.id);

//     return response.json({ message: 'ok' });
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

export default studentsRouter;
