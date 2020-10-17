import { getRepository } from 'typeorm';

import Teacher from '../models/Teacher';
import User from '../models/User';

interface RequestDTO {
  id: string;
}

class CreateTeacherService {
  public async execute({ id }: RequestDTO): Promise<Teacher> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne(id);

    if (!userExists) {
      throw new Error('User not found!');
    }

    const teacherRepository = getRepository(Teacher);

    const teacherExists = await teacherRepository.findOne({
      where: { user_id: id },
    });

    if (teacherExists) {
      throw new Error('Already an teacher!');
    }

    const teacher = teacherRepository.create({ user_id: id });

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
