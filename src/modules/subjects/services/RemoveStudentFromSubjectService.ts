import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';

import { inject, injectable } from 'tsyringe';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import AppError from '@shared/errors/AppError';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import Subject from '../infra/typeorm/entities/Subject';

interface RequestDTO {
  teacher_id: string;
  student_id: string;
  subject_id: string;
}

@injectable()
class RemoveStudentFromSubjectService {
  private teachersRepository: ITeachersRepository;

  private studentsRepository: IStudentsRepository;

  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('TeachersRepository')
    teachersRepository: ITeachersRepository,
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.teachersRepository = teachersRepository;
    this.studentsRepository = studentsRepository;
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    teacher_id,
    student_id,
    subject_id,
  }: RequestDTO): Promise<Subject | undefined> {
    const teacher = await this.teachersRepository.findById(teacher_id);

    if (!teacher) {
      throw new AppError('Not enough permission!');
    }

    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found!');
    }

    const subject = await this.subjectsRepository.findById(subject_id);

    if (!subject) {
      throw new AppError('Subject not found!');
    }

    if (subject.teacher_id !== teacher.id) {
      throw new AppError('Not enough permission!');
    }

    const students = subject.students.filter(st => {
      return st.id !== student.id;
    });

    subject.students = students;
    await this.subjectsRepository.save(subject);

    return subject;
  }
}

export default RemoveStudentFromSubjectService;
