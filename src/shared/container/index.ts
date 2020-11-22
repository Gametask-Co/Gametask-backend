import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITeacherRepository from '@modules/teachers/repositories/ITeachersRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import IMilestonesRepository from '@modules/subjects/repositories/IMilestoneRepository';
import MilestonesRepository from '@modules/subjects/infra/typeorm/repositories/MilestonesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITeacherRepository>(
  'TeachersRepository',
  TeachersRepository,
);

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<ISubjectsRepository>(
  'SubjectsRepository',
  SubjectsRepository,
);

container.registerSingleton<IMilestonesRepository>(
  'MilestonesRepository',
  MilestonesRepository,
);
