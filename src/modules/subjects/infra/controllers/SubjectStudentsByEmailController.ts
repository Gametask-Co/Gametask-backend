import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddStudentToSubjectByEmailService from '@modules/subjects/services/AddStudentToSubjectByEmailService';

export default class SubjectStudentsByEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { subject_id, student_email } = request.body;

    // TODO: CHECK IF USER HAS PERMISSION TO ADD TO SUBJECT
    // const user_id = request.user.id;

    const addStudentToSubjectByEmail = container.resolve(
      AddStudentToSubjectByEmailService,
    );

    const subject = await addStudentToSubjectByEmail.execute({
      subject_id,
      student_email,
    });

    return response.json(subject);
  }
}
