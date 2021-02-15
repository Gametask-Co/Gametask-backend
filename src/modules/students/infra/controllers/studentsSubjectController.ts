import { Request, Response } from 'express';
import { container } from 'tsyringe';

import JoinSubjectByCode from '@modules/students/services/JoinSubjectByCode';

class StudentsSubjectController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { subjectCode } = request.params;

    const joinSubjectByCode = container.resolve(JoinSubjectByCode);

    const subject = await joinSubjectByCode.execute({ subjectCode, userId });

    return response.json(subject);
  }
}

export default StudentsSubjectController;
