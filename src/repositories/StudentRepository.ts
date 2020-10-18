import { EntityRepository, Repository } from 'typeorm';

import Student from '../models/Student';

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {
  public async findByUserId(id: string): Promise<Student | null> {
    const findStudent = await this.findOne({ where: { user_id: id } });

    return findStudent || null;
  }
}

export default StudentRepository;
