import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddStudentToSubjectService from '@modules/subjects/services/AddStudentToSubjectService';

export default class SubjectStudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { student_id, subject_id } = request.body;

    // TODO: CHECK IF USER HAS PERMISSION TO ADD TO SUBJECT
    // const user_id = request.user.id;

    const addStudentToSubject = container.resolve(AddStudentToSubjectService);

    const subject = await addStudentToSubject.execute({
      student_id,
      subject_id,
    });

    return response.json(subject);
  }
}
