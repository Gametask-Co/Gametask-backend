import Student from '@modules/students/infra/typeorm/entities/Student';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

interface RequestDTO {
  subjectId: string;
  student: string;
  teacher: string;
}

@injectable()
class IndexSubjectService {
  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    subjectId,
    student,
    teacher,
  }: RequestDTO): Promise<Subject | undefined> {
    const subject = await this.subjectsRepository.findById(subjectId);

    if (!subject) {
      throw new AppError('Subject not found!', 400);
    }

    if (subject.students.find((st: Student) => st.id === student)) {
      delete subject.activities;
    }

    if (
      subject.teacher_id !== teacher &&
      !subject.students.find((st: Student) => st.id === student)
    ) {
      throw new AppError('Need permision or subject does not exist!');
    }

    return subject;
  }
}

export default IndexSubjectService;
