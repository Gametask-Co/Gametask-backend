import connection from '../../../src/shared/helper/connection';

import UsersRepository from '../../../src/modules/users/infra/typeorm/repositories/UsersRepository';
import HashProvider from '../../../src/modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import AuthenticateUserService from '../../../src/modules/users/services/AuthenticateUserService';
import CreateUserService from '../../../src/modules/users/services/CreateUserService';

describe('AuthenticateUser', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should be able to authenticate', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
