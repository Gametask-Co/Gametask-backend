import { container } from 'tsyringe';
import SendResetUserPasswordEmailService from '@modules/users/services/SendResetUserPasswordEmailService';

import { Request, Response } from 'express';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmail = container.resolve(
      SendResetUserPasswordEmailService,
    );

    await sendForgotEmail.execute({ email });

    return response.status(204).json();
  }
}
