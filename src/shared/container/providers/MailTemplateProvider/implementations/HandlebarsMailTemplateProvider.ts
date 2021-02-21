import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parsedTemplate = handlebars.compile(template);
    return parsedTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
