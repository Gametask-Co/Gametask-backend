import connection from '@shared/helper/connection';
import { createUser } from '@shared/helper/testHelper';
import ResetUserPassword from '@modules/users/services/ResetUserPassword';
import HashProvider from '../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../../modules/users/infra/typeorm/repositories/UsersRepository';

describe('ResetUserPassword', () => {
  const userEmail = 'test@gametask.com';
  const userPassword = 'test123';
  let usersRepository;
  let hashProvider;

  beforeAll(async () => {
    await connection.create();

    await createUser({
      email: userEmail,
      password: userPassword,
      name: 'Test User',
    });

    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('Reset Password', () => {
    it('Should change users password', async () => {
      const resetPassword = new ResetUserPassword(
        usersRepository,
        hashProvider,
      );

      const new_password = 'test1234';

      const response = await resetPassword.execute({
        email: userEmail,
        new_password,
      });

      expect(response).toHaveProperty('id');
    });
  });
});
