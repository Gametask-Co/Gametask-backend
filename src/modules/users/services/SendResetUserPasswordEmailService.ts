import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import UsersTokensRepository from '../infra/typeorm/repositories/UsersTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendResetUserPasswordEmailService {
  private usersRepository: IUsersRepository;

  private usersTokensRepository: UsersTokensRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepository,

    @inject('MailProvider')
    mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.mailProvider = mailProvider;
  }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (!checkUsersExists) {
      throw new AppError('User does not exists!');
    }

    const { token } = await this.usersTokensRepository.generate(
      checkUsersExists.id,
    );

    await this.mailProvider.sendMail({
      to: {
        name: checkUsersExists.name,
        email: checkUsersExists.email,
      },
      subject: '[Gametask] Recuperação de senha',
      templateData: {
        template: 'Ola, {{name}}: {{token}}',
        variables: {
          name: checkUsersExists.name,
          token,
        },
      },
    });
  }
}

export default SendResetUserPasswordEmailService;
