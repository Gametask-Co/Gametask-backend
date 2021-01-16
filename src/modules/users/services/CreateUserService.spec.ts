import connection from '@shared/helper/connection';

import AppError from '@shared/errors/AppError';

import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should be able to create a new user', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with a used email', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe2@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
