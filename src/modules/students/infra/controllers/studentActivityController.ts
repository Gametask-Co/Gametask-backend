import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentActivityService from '@modules/students/services/CreateStudentActivityService';

class StudentActivityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      student_id,
      subject_id,
      milestone_id,
      block_id,
      subjectclass_id,
      task_id,
    } = request.body;

    const createStudentActivity = container.resolve(
      CreateStudentActivityService,
    );

    const studentActivity = await createStudentActivity.execute({
      student_id,
      subject_id,
      subjectclass_id,
      milestone_id,
      block_id,
      task_id,
    });

    return response.json(studentActivity);
  }

  // public async index(
  //   request: Request,
  //   response: Response,
  // ): Promise<StudentActivity | undefined> {}

  // public async list(
  //   request: Request,
  //   response: Response,
  // ): Promise<StudentActivity[] | []>;
}

export default StudentActivityController;
