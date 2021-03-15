import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import UsersViews from '@modules/users/views';
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

    const usersView = new UsersViews();

    await this.mailProvider.sendMail({
      to: {
        name: checkUsersExists.name,
        email: checkUsersExists.email,
      },
      subject: '[Gametask] Recuperação de senha',
      templateData: {
        file: usersView.findMailTemplate('forgot_password'),
        variables: {
          name: checkUsersExists.name,
          link: `http://gametask.devops.ifrn.edu.br/password/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendResetUserPasswordEmailService;
