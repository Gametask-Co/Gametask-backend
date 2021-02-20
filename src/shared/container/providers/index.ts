import { container } from 'tsyringe';

import IMailProvider from '@shared/container/providers/EmailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/EmailProvider/implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
