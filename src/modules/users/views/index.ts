import path from 'path';

class UsersViews {
  public findMailTemplate(templateName: string): string {
    const templatePath = path.resolve(
      __dirname,
      'emails',
      `${templateName}.hbs`,
    );
    return templatePath;
  }
}

export default UsersViews;
