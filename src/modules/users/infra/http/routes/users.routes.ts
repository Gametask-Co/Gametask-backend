import { Router } from 'express';

import UserController from '@modules/users/infra/controller/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);
userRouter.get('/', ensureAuthenticated, userController.index);

// userRouter.delete('/', ensureAuthenticated, async (request, response) => {
//   try {
//     const { id } = request.user;

//     const userRepository = getRepository(User);

//     await userRepository.delete({ id });

//     return response.json({ message: 'ok' });
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

export default userRouter;
