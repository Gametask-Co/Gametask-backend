import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/EmailProvider/models/IMailProvider';
import UsersTokensRepository from '../infra/typeorm/repositories/UsersTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendResetUserPasswordEmailService {
  private usersRepository: IUsersRepository;

  private usersTokensRepository: UsersTokensRepository;

  private emailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepository,

    @inject('EmailProvider')
    emailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.emailProvider = emailProvider;
  }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (!checkUsersExists) {
      throw new AppError('User does not exists!');
    }

    const userToken = await this.usersTokensRepository.generate(
      checkUsersExists.id,
    );

    await this.emailProvider.sendMail(email, 'body');
  }
}

export default SendResetUserPasswordEmailService;
