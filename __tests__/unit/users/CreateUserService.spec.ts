import connection from '../../../src/shared/helper/connection';

import AppError from '../../../src/shared/errors/AppError';

import HashProvider from '../../../src/modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../../src/modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '../../../src/modules/users/services/CreateUserService';

describe('Users', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateUser', () => {
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
});
