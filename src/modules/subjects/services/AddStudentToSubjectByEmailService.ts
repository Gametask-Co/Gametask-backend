import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

interface RequestDTO {
  student_email: string;
  subject_id: string;
}

@injectable()
class AddStudentToSubjectByEmailService {
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
    student_email,
    subject_id,
  }: RequestDTO): Promise<Subject> {
    const student = await this.studentsRepository.findByEmail(student_email);

    if (!student) {
      throw new AppError('Student not found!');
    }

    const subject = await this.subjectsRepository.findById(subject_id);

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

export default AddStudentToSubjectByEmailService;
