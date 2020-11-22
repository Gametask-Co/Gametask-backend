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
  private studentsRepository: IStudentsRepository;

  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.studentsRepository = studentsRepository;
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    student_id,
    subject_id,
  }: RequestDTO): Promise<Subject | undefined> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found!');
    }

    const subject = await this.subjectsRepository.findById(subject_id);

    if (!subject) {
      throw new AppError('Subject not found!');
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
