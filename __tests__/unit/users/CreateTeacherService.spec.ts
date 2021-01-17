import 'reflect-metadata';

import connection from '../../../src/shared/helper/connection';
import AppError from '../../../src/shared/errors/AppError';
import { createUser } from '../../../src/shared/helper/testHelper';
import CreateTeacherService from '../../../src/modules/teachers/services/CreateTeacherService';

import IUsersRepository from '../../../src/modules/users/repositories/IUsersRepository';
import TeachersRepository from '../../../src/modules/teachers/infra/typeorm/repositories/TeachersRepository';
import User from '../../../src/modules/users/infra/typeorm/entities/User';

import UsersRepository from '../../../src/modules/users/infra/typeorm/repositories/UsersRepository';

describe('Teachers', () => {
  describe('CreateTeacher', () => {
    let usersRepository: IUsersRepository;
    let user: User;

    beforeAll(async () => {
      await connection.create();
      user = await createUser({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
      });
      usersRepository = new UsersRepository();
    });

    afterAll(async () => {
      await connection.clear();
      await connection.close();
    });

    it('Should create a teacher', async () => {
      const teachersRepository = new TeachersRepository();

      const createTeacher = new CreateTeacherService(
        teachersRepository,
        usersRepository,
      );
      const teacher = await createTeacher.execute(user.id);

      expect(teacher).toHaveProperty('id');
    });

    it('Should not be able to create a new user with a used email', async () => {
      const teachersRepository = new TeachersRepository();

      const createTeacher = new CreateTeacherService(
        teachersRepository,
        usersRepository,
      );

      expect(createTeacher.execute(user.id)).rejects.toBeInstanceOf(AppError);
    });
  });
});
