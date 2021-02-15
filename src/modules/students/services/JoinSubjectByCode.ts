import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import IStudentsRepository from '../repositories/IStudentsRepository';

interface RequestDTO {
  subjectCode: string;
  userId: string;
}

@injectable()
class JoinSubjectByCode {
  private subjectsRepository: ISubjectsRepository;

  private studentsRepository: IStudentsRepository;

  constructor(
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository;
    this.studentsRepository = studentsRepository;
  }

  public async execute({
    subjectCode,
    userId,
  }: RequestDTO): Promise<Subject | undefined> {
    const student = await this.studentsRepository.findByUserId(userId);

    if (!student) {
      throw new AppError('Student not found!');
    }

    const subject = await this.subjectsRepository.findByCode(subjectCode);

    if (!subject) {
      throw new AppError('Subject not found!');
    }

    if (!subject.students) {
      subject.students = [];
    }

    const students = subject.students.filter(st => {
      return st.id !== student.id;
    });

    students.push(student);

    subject.students = students;
    await this.subjectsRepository.save(subject);

    return subject;
  }
}

export default JoinSubjectByCode;
