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

import TasksRepository from '@modules/subjects/infra/typeorm/repositories/TasksRepository';
import ITasksRepository from '@modules/subjects/repositories/ITasksRepository';

import BlocksRepository from '@modules/subjects/infra/typeorm/repositories/BlocksRepository';
import IBlocksRepository from '@modules/subjects/repositories/IBlocksRepository';

import SubjectClassesRepository from '@modules/subjects/repositories/fakes/fakeSubjectClassesRepository';
import ISubjectClassesRepository from '@modules/subjects/repositories/ISubjectClassesRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
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

container.registerSingleton<IBlocksRepository>(
  'BlocksRepository',
  BlocksRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);

container.registerSingleton<ISubjectClassesRepository>(
  'SubjectClassesRepository',
  SubjectClassesRepository,
);
