import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { isAfter, addHours } from 'date-fns';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetUserPassword {
  private usersRepository: IUsersRepository;

  private usersTokensRepository: IUsersTokensRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ token, password }: IRequestDTO): Promise<User> {
    const checkUserTokenExists = await this.usersTokensRepository.findByToken(
      token,
    );

    if (!checkUserTokenExists) {
      throw new AppError('User token is invalid!');
    }

    const { created_at } = checkUserTokenExists;

    const compareDate = addHours(created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Expired token!');
    }

    const user = await this.usersRepository.findById(
      checkUserTokenExists.user_id,
    );

    if (!user) {
      throw new AppError('User not found!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userUpdated = {
      ...user,
      password: hashedPassword,
    };

    await this.usersRepository.save(userUpdated);

    return userUpdated;
  }
}

export default ResetUserPassword;
