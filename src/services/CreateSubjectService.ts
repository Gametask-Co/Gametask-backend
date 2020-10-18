import { getCustomRepository } from 'typeorm';

import TeacherRepository from '../repositories/TeacherRepository';
import SubjectRepository from '../repositories/SubjectRepository';

import Subject from '../models/Subject';

interface RequestDTO {
  name: string;
  description: string;
  user_id: string;
}

class CreateSubjectService {
  public async execute({
    name,
    description,
    user_id,
  }: RequestDTO): Promise<Subject> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findByUserId(user_id);

    if (!teacher) {
      throw new Error('Teacher or User not found!');
    }

    const subjectRepository = getCustomRepository(SubjectRepository);

    const subject = subjectRepository.create({
      name,
      description,
      teacher_id: teacher.id,
    });

    await subjectRepository.save(subject);

    return subject;
  }
}

export default CreateSubjectService;
