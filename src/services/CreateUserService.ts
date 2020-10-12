import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  birthday: Date;
  gender: string;
  avatar_url?: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password,
  }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email already taken');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      birthday,
      gender,
      avatar_url,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
