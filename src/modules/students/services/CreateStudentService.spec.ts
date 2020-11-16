import 'reflect-metadata';

import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/fakeStudentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

describe('CreateStudent', () => {
  let fakeUsersRepository: IUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });
  });

  it('Should create a student', async () => {
    const user = await fakeUsersRepository.findByEmail('johndoe@example.com');

    const fakeStudentsRepository = new FakeStudentsRepository(
      fakeUsersRepository,
    );

    const createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeUsersRepository,
    );

    const student = await createStudent.execute({ id: user.id });

    expect(student).toHaveProperty('id');
  });
});
