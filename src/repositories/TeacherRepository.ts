import { EntityRepository, Repository } from 'typeorm';

import Teacher from '../models/Teacher';

@EntityRepository(Teacher)
class TeacherRepository extends Repository<Teacher> {
  public async findByUserId(id: string): Promise<Teacher | null> {
    const findTeacher = await this.findOne({ where: { user_id: id } });

    return findTeacher || null;
  }
}

export default TeacherRepository;
