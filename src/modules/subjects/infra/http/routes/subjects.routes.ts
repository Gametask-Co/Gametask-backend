import { Router } from 'express';

import SubjectsController from '@modules/subjects/infra/controllers/SubjectsController';
import SubjectStudentsController from '@modules/subjects/infra/controllers/SubjectStudentsController';
import SubjectStudentsByEmailController from '@modules/subjects/infra/controllers/SubjectStudentsByEmailController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();
const subjectStudentsController = new SubjectStudentsController();
const subjectStudentsByEmailController = new SubjectStudentsByEmailController();

subjectsRouter.post('/', ensureAuthenticated, subjectsController.create);

subjectsRouter.get('/', ensureAuthenticated, subjectsController.show);

// SubjectStudentsController

subjectsRouter.post(
  '/student',
  ensureAuthenticated,
  subjectStudentsController.create,
);

// SubjectStudentsByEmailController

subjectsRouter.post(
  '/student/email',
  ensureAuthenticated,
  subjectStudentsByEmailController.create,
);

// subjectsRouter.delete(
//   '/student',
//   ensureAuthenticated,
//   async (request, response) => {
//     try {
//       const { subject_id, student_id } = request.body;
//       const user_id = request.user.id;

//       const removeStudentFromSubjectService = new RemoveStudentFromSubjectService();
//       await removeStudentFromSubjectService.execute({
//         user_id,
//         subject_id,
//         student_id,
//       });

//       return response.json({ message: 'ok' });
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   },
// );

export default subjectsRouter;
