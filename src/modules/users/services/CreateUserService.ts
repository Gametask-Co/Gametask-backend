import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  birthday: Date;
  gender: string;
  avatar_url?: string;
  password: string;
}

@injectable()
class CreateUserService {
  private usersRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUserRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    name,
    email,
    birthday,
    gender,
    avatar_url,
    password,
  }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adress already taken');
    }
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      birthday,
      gender,
      avatar_url,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
