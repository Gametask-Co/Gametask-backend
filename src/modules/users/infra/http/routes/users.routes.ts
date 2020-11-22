import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UserController from '@modules/users/infra/controller/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserAvatarController from '../../controller/UserAvatarController';

const userRouter = Router();
const userController = new UserController();

const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.post('/', userController.create);
userRouter.get('/', ensureAuthenticated, userController.index);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

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
