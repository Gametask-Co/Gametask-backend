import { getCustomRepository } from 'typeorm';

import SubjectRepository from '../repositories/SubjectRepository';
import StudentRepository from '../repositories/StudentRepository';

import Student from '../models/Student';

interface RequestDTO {
  user_id: string;
  subject_id: string;
}

class RemoveStudentFromSubjectService {
  public async execute({
    user_id,
    subject_id,
  }: RequestDTO): Promise<Student | null> {
    const studentRepository = getCustomRepository(StudentRepository);
    const student = await studentRepository.findByUserId(user_id);

    if (!student) {
      throw new Error('Student not found!');
    }

    const subjectRepository = getCustomRepository(SubjectRepository);

    const subject = await subjectRepository.findOne({
      relations: ['students'],
      where: { id: subject_id },
    });

    if (!subject) {
      throw new Error('Subject not found!');
    }

    const students = subject.students.filter(st => {
      return st.id === student.id;
    });

    subject.students = students;
    await subjectRepository.save(subject);

    return student;
  }
}

export default RemoveStudentFromSubjectService;
