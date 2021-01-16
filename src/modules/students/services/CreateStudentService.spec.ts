import 'reflect-metadata';

import connection from '@shared/helper/connection';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { createUser } from '@shared/helper/testHelper';

describe('CreateStudent', () => {
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
