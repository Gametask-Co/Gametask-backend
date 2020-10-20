import { EntityRepository, Repository } from 'typeorm';

import Student from '../models/Student';

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {
  public async findByUserId(id: string): Promise<Student | null> {
    const findStudent = await this.findOne({ where: { user_id: id } });

    return findStudent || null;
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const findUser = await this.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new Error('Student not found!');
    }

    const findStudent = await this.findOne({
      where: {
        user_id: findUser.id,
      },
    });

    if (!findStudent) {
      throw new Error('Student not found!');
    }

    return findStudent || null;
  }
}

export default StudentRepository;
