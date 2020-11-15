import 'reflect-metadata';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';

import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/fakeSubjectsRepository';
import FakeTeachersRepository from '@modules/teachers/repositories/fakes/fakeTeachersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

describe('CreateSubject', () => {
  let fakeUsersRepository: IUsersRepository;
  let fakeTeachersRepository: ITeachersRepository;
  let teacher: Teacher;

  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.findByEmail('johndoe@example.com');

    fakeTeachersRepository = new FakeTeachersRepository(fakeUsersRepository);

    const createTeacher = new CreateTeacherService(
      fakeTeachersRepository,
      fakeUsersRepository,
    );

    teacher = await createTeacher.execute(user.id);
  });

  it('Should create a new subject', async () => {
    const fakeSubjectsRepository = new FakeSubjectsRepository();

    const createSubject = new CreateSubjectService(
      fakeSubjectsRepository,
      fakeTeachersRepository,
    );

    const subject = await createSubject.execute({
      name: 'Subject Test',
      description: 'Test',
      teacher_id: teacher.id,
    });

    expect(subject).toHaveProperty('id');
  });
});
