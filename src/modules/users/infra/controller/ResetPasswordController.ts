import { container } from 'tsyringe';
import ResetUserPassword from '@modules/users/services/ResetUserPassword';

import { Request, Response } from 'express';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetUserPassword);

    const user = await resetPassword.execute({ token, password });

    return response.json({ ...user, password: undefined });
  }
}
