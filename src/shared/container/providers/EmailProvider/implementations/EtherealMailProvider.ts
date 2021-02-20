import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/EmailProvider/models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe Gametask <gametask@gametask.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(message.messageId);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}
