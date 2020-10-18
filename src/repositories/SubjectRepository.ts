import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import TeacherRepository from './TeacherRepository';

import Subject from '../models/Subject';

@EntityRepository(Subject)
class SubjectRepository extends Repository<Subject> {
  public async findAllSubjectByTeachersUserId(
    id: string,
  ): Promise<Subject[] | null> {
    const teacherRepository = getCustomRepository(TeacherRepository);
    const findTeacher = await teacherRepository.findByUserId(id);

    if (!findTeacher) {
      throw new Error('Teacher not found!');
    }

    const findSubject = await this.find({
      where: { teacher_id: findTeacher.id },
    });

    return findSubject || null;
  }
}

export default SubjectRepository;
