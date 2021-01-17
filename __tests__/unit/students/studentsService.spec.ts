import 'reflect-metadata';

import connection from '../../../src/shared/helper/connection';
import CreateStudentService from '../../../src/modules/students/services/CreateStudentService';
import UsersRepository from '../../../src/modules/users/infra/typeorm/repositories/UsersRepository';
import StudentsRepository from '../../../src/modules/students/infra/typeorm/repositories/StudentsRepository';
import IUsersRepository from '../../../src/modules/users/repositories/IUsersRepository';
import User from '../../../src/modules/users/infra/typeorm/entities/User';
import { createUser } from '../../../src/shared/helper/testHelper';

describe('Students', () => {
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

  describe('CreateStudent', () => {
    it('Should create a student', async () => {
      const studentsRepository = new StudentsRepository();

      const createStudent = new CreateStudentService(
        studentsRepository,
        usersRepository,
      );

      const student = await createStudent.execute({ id: user.id });

      expect(student).toHaveProperty('id');
    });
  });
});
