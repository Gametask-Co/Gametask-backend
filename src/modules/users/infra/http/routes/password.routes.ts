import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/controller/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/controller/ResetPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
