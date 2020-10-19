import { getCustomRepository } from 'typeorm';

import SubjectRepository from '../repositories/SubjectRepository';
import StudentRepository from '../repositories/StudentRepository';

import Subject from '../models/Subject';

interface RequestDTO {
  student_id: string;
  subject_id: string;
}

class AddStudentToSubjectService {
  public async execute({
    student_id,
    subject_id,
  }: RequestDTO): Promise<Subject> {
    const studentRepository = getCustomRepository(StudentRepository);
    const student = await studentRepository.findOne({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      throw new Error('Student not found!');
    }

    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findOne({
      where: {
        id: subject_id,
      },
    });

    if (!subject) {
      throw new Error('Subject not found!');
    }

    if (!subject.students) {
      subject.students = [];
    }

    subject.students.push(student);
    await subjectRepository.save(subject);

    return subject;
  }
}

export default AddStudentToSubjectService;
