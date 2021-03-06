import ICreateUser from '@modules/users/dtos/ICreateUserDTO';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import MilestonesRepository from '@modules/subjects/infra/typeorm/repositories/MilestonesRepository';
import TasksRepository from '@modules/subjects/infra/typeorm/repositories/TasksRepository';
import BlocksRepository from '@modules/subjects/infra/typeorm/repositories/BlocksRepository';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';
import Block from '@modules/subjects/infra/typeorm/entities/Block';
import Task from '@modules/subjects/infra/typeorm/entities/Task';

interface ICreateSubject {
  userData?: ICreateUser;
  teacherData?: Teacher;
  subjectData: { name: string; description: string };
}

interface ICreateMilestone extends ICreateSubject {
  milestoneData: { name: string; description: string };
}

interface ICreateBlock extends ICreateMilestone {
  blockData: { name: string };
}

interface ICreateTask {
  name: string;
  description?: string;
  block_id?: string;
  attachment_url?: string;
  total_score?: number;
  due?: Date;
}
interface IAuthenticateUse {
  user: User;
  token: string;
  teacher?: Teacher;
  student?: Student;
}

interface IndexTeacher {
  user_id?: string;
  teacher_id?: string;
}

export const createUser = async ({
  name,
  email,
  birthday,
  gender,
  avatar_url,
  password,
}: ICreateUser): Promise<User> => {
  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const hashedPassword = await hashProvider.generateHash(password);

  const user = await usersRepository.create({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password: hashedPassword,
  });

  return user;
};

export const createStudent = async ({
  email,
  name,
  password,
  avatar_url,
  birthday,
  gender,
}: ICreateUser): Promise<Student> => {
  const user = await createUser({
    email,
    name,
    password,
    avatar_url,
    birthday,
    gender,
  });

  const studentsRepository = new StudentsRepository();
  const student = await studentsRepository.create(user.id);

  return student;
};

export const createTeacher = async ({
  name,
  email,
  birthday,
  gender,
  avatar_url,
  password,
}: ICreateUser): Promise<Teacher> => {
  const teachersRepository = new TeachersRepository();
  const user = await createUser({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password,
  });

  const teacher = await teachersRepository.create(user.id);

  return teacher;
};

export const getTeacher = async ({
  user_id,
  teacher_id,
}: IndexTeacher): Promise<Teacher | undefined> => {
  const teachersRepository = new TeachersRepository();

  let teacher: Teacher;

  if (teacher_id) {
    teacher = await teachersRepository.findById(teacher_id);
  } else {
    teacher = await teachersRepository.findByUserId(user_id);
  }

  return teacher;
};

export const createSubject = async ({
  userData,
  subjectData,
  teacherData,
}: ICreateSubject): Promise<{ subject: Subject; teacher: Teacher }> => {
  const teacher = teacherData || (await createTeacher(userData));

  const subjectsRepository = new SubjectsRepository();

  const subject = await subjectsRepository.create({
    ...subjectData,
    teacher_id: teacher.id,
  });

  return { subject, teacher };
};

export const createMilestone = async ({
  userData,
  teacherData,
  subjectData,
  milestoneData,
}: ICreateMilestone): Promise<{ milestone: Milestone; subject: Subject }> => {
  const { subject } = await createSubject({
    subjectData,
    teacherData,
    userData,
  });

  const milestonesRepository = new MilestonesRepository();

  const milestone = await milestonesRepository.create({
    ...milestoneData,
    subject_id: subject.id,
  });

  return { milestone, subject };
};

export const createSubjectBlock = async ({
  userData,
  teacherData,
  subjectData,
  milestoneData,
  blockData,
}: ICreateBlock): Promise<{
  milestone: Milestone;
  subject: Subject;
  block: Block;
}> => {
  const { milestone, subject } = await createMilestone({
    userData,
    teacherData,
    subjectData,
    milestoneData,
  });

  const blocksRepository = new BlocksRepository();

  const block = await blocksRepository.create({
    name: blockData.name,
    milestone_id: milestone.id,
    subject_id: subject.id,
  });

  return { block, milestone, subject };
};

export const createTaskInExistingBlock = async ({
  blockData,
  taskData,
}: {
  blockData: Block;
  taskData: ICreateTask;
}): Promise<Task> => {
  const tasksRepository = new TasksRepository();

  const task = await tasksRepository.create({
    block_id: blockData.id,
    name: taskData.name,
    description: taskData.description,
    due: taskData.due,
    total_score: taskData.total_score,
    attachment_url: taskData.attachment_url,
  });

  return task;
};

export const joinStudentInSubject = async ({
  student_id,
  subject_id,
}: {
  student_id: string;
  subject_id: string;
}): Promise<void> => {
  const subjectsRepository = new SubjectsRepository();
  const studentsRepository = new StudentsRepository();

  const subject = await subjectsRepository.findById(subject_id);
  const student = await studentsRepository.findById(student_id);
  subject.students.push(student);
  await subjectsRepository.save(subject);
};

export const createUserAndLogin = async ({
  name,
  email,
  birthday,
  gender,
  avatar_url,
  password,
}: ICreateUser): Promise<IAuthenticateUse> => {
  await createUser({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password,
  });

  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    hashProvider,
  );

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  return { token, user };
};

export const createAndLoginAsTeacher = async ({
  name,
  email,
  birthday,
  gender,
  avatar_url,
  password,
}: ICreateUser): Promise<IAuthenticateUse> => {
  const teacher = await createTeacher({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password,
  });

  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    hashProvider,
  );

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  return { token, user, teacher };
};

export const createAndLoginAsStudent = async ({
  name,
  email,
  birthday,
  gender,
  avatar_url,
  password,
}: ICreateUser): Promise<IAuthenticateUse> => {
  await createStudent({ name, email, birthday, gender, avatar_url, password });

  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    hashProvider,
  );

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  return { token, user };
};

export const getDateNow = (): string => {
  const date = new Date(Date.now());

  const formatedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return formatedDate;
};
