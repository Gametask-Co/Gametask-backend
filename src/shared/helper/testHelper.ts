import ICreateUser from '@modules/users/dtos/ICreateUserDTO';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Student from '@modules/students/infra/typeorm/entities/Student';

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

export const createSubject = async ({
  userData,
  subjectData,
}: {
  userData: ICreateUser;
  subjectData: { name: string; description: string };
}): Promise<Subject> => {
  const teacher = await createTeacher(userData);

  const subjectsRepository = new SubjectsRepository();

  const subject = await subjectsRepository.create({
    ...subjectData,
    teacher_id: teacher.id,
  });

  return subject;
};
