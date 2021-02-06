import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  new_password: string;
}

@injectable()
class ResetUserPassword {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, new_password }: IRequestDTO): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (!checkUsersExists) {
      throw new AppError('User does not exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(new_password);

    const user = {
      ...checkUsersExists,
      password: hashedPassword,
    };

    await this.usersRepository.save(user);

    return user;
  }
}

export default ResetUserPassword;
