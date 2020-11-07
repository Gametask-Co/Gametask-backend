import { Router } from 'express';
import SubjectsController from '@modules/subjects/infra/controllers/SubjectsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();

subjectsRouter.post('/', ensureAuthenticated, subjectsController.create);

subjectsRouter.get('/', ensureAuthenticated, subjectsController.show);

// subjectsRouter.post(
//   '/student',
//   ensureAuthenticated,
//   async (request, response) => {
//     try {
//       const { subject_id, student_id } = request.body;
//       const user_id = request.user.id;

//       const addStudentToSubjectService = new AddStudentToSubjectService();
//       const subject = await addStudentToSubjectService.execute({
//         user_id,
//         subject_id,
//         student_id,
//       });

//       return response.json(subject);
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   },
// );

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

// subjectsRouter.post(
//   '/student/email',
//   ensureAuthenticated,
//   async (request, response) => {
//     try {
//       const { subject_id, student_email } = request.body;
//       const user_id = request.user.id;

//       const studentRepository = getCustomRepository(StudentRepository);
//       const student = await studentRepository.findByEmail(student_email);

//       if (!student) {
//         return response.status(400).json({ message: 'Student not found!' });
//       }

//       const addStudentToSubjectService = new AddStudentToSubjectService();
//       const subject = await addStudentToSubjectService.execute({
//         user_id,
//         subject_id,
//         student_id: student.id,
//       });

//       return response.json(subject);
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   },
// );

export default subjectsRouter;
