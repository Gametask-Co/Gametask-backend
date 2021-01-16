import { createConnection, getConnection } from 'typeorm';

import ICreateUser from '@modules/users/dtos/ICreateUserDTO';

import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

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
