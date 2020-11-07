import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      birthday,
      gender,
      avatar_url,
      password,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      birthday,
      gender,
      avatar_url: avatar_url || null,
      password,
    });

    return response.json({ ...user, password: undefined });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    return response.json({ ...user, password: undefined });
  }
}
