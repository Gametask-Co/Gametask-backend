import { container } from 'tsyringe';
import ResetUserPassword from '@modules/users/services/ResetUserPassword';

import { Request, Response } from 'express';

export default class UserPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { email, new_password } = request.body;

    const resetPassword = container.resolve(ResetUserPassword);

    const user = await resetPassword.execute({ email, new_password });

    return response.json({ ...user, password: undefined });
  }
}
