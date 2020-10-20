import { getCustomRepository } from 'typeorm';

import SubjectRepository from '../repositories/SubjectRepository';
import StudentRepository from '../repositories/StudentRepository';

import Student from '../models/Student';
import TeacherRepository from '../repositories/TeacherRepository';

interface RequestDTO {
  user_id: string;
  student_id: string;
  subject_id: string;
}

class RemoveStudentFromSubjectService {
  public async execute({
    user_id,
    student_id,
    subject_id,
  }: RequestDTO): Promise<Student | null> {
    // CHECK IF TEACHER EXISTS
    const teacherRepository = getCustomRepository(TeacherRepository);
    const teacher = await teacherRepository.findOne({
      where: { user_id },
    });

    if (!teacher) {
      throw new Error('Not enough permission!');
    }

    // CHECK IF STUDENT EXISTS

    const studentRepository = getCustomRepository(StudentRepository);
    const student = await studentRepository.findOne({
      where: { id: student_id },
    });

    if (!student) {
      throw new Error('Student not found!');
    }

    // CHECK IF SUBJECT EXISTS

    const subjectRepository = getCustomRepository(SubjectRepository);

    const subject = await subjectRepository.findOne({
      relations: ['students'],
      where: { id: subject_id },
    });

    if (!subject) {
      throw new Error('Subject not found!');
    }

    // CHECK IF TEACHER IS OWNER OF SUBJECT

    if (subject.teacher_id !== teacher.id) {
      throw new Error('Not enough permission!');
    }

    const students = subject.students.filter(st => {
      return st.id !== student.id;
    });

    subject.students = students;
    await subjectRepository.save(subject);

    return student;
  }
}

export default RemoveStudentFromSubjectService;
