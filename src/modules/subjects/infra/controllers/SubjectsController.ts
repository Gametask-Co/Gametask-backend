import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import AppError from '@shared/errors/AppError';
import IndexSubjectService from '@modules/subjects/services/IndexSubjectService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import Subject from '../typeorm/entities/Subject';

export default class SubjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { subjectId } = request.params;
    const { student, teacher } = request.user;

    const indexSubject = container.resolve(IndexSubjectService);

    const subject = await indexSubject.execute({ subjectId, student, teacher });

    return response.json(subject);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, background_url } = request.body;

    const teachersRepository = new TeachersRepository();
    const teacher = await teachersRepository.findByUserId(request.user.id);

    if (!teacher) {
      throw new AppError('Teacher not found');
    }

    const createSubject = container.resolve(CreateSubjectService);

    const subject = await createSubject.execute({
      name,
      description,
      teacher_id: teacher.id,
      background_url,
    });

    return response.json(subject);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let subjects_teacher: Subject[] = [];
    let subjects_student: Subject[] = [];

    const subjectsRepository = new SubjectsRepository();

    if (request.user.student) {
      const studentsRepository = new StudentsRepository();
      const student = await studentsRepository.findById(request.user.student);

      if (!student) {
        throw new AppError('Student not found');
      }

      subjects_student = await subjectsRepository.findAllByStudentId(
        student.id,
      );
    }

    if (request.user.teacher) {
      const teachersRepository = new TeachersRepository();
      const teacher = await teachersRepository.findById(request.user.teacher);

      if (!teacher) {
        throw new AppError('Teacher not found');
      }

      subjects_teacher = await subjectsRepository.findAllByTeacherId(
        teacher.id,
      );
    }

    return response.json({
      student_user: subjects_student,
      teacher_user: classToClass(subjects_teacher),
    });
  }
}
