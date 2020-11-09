import 'reflect-metadata';

import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';

import FakeTeachersRepository from '@modules/teachers/repositories/fakes/fakeTeachersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  let fakeUsersRepository: IUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });
  });

  it('Should receive User not found', async () => {
    const user = await fakeUsersRepository.findByEmail('johndoe@example.com');

    const fakeTeachersRepository = new FakeTeachersRepository(
      fakeUsersRepository,
    );

    const createTeacher = new CreateTeacherService(
      fakeTeachersRepository,
      fakeUsersRepository,
    );
    const teacher = await createTeacher.execute(user.id);

    expect(teacher).toHaveProperty('id');
  });

  it('Should not be able to create a new user with a used email', async () => {
    const user = {
      id: '1',
    };

    const fakeTeachersRepository = new FakeTeachersRepository(
      fakeUsersRepository,
    );

    const createTeacher = new CreateTeacherService(
      fakeTeachersRepository,
      fakeUsersRepository,
    );

    expect(createTeacher.execute(user.id)).rejects.toBeInstanceOf(AppError);
  });
});
