import { getRepository, getCustomRepository } from 'typeorm';

import TeacherRepository from '../repositories/TeacherRepository';

import Teacher from '../models/Teacher';
import User from '../models/User';

interface RequestDTO {
  id: string;
}

class CreateTeacherService {
  public async execute({ id }: RequestDTO): Promise<Teacher> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ id });

    if (!userExists) {
      throw new Error('User not found!');
    }

    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacherExists = await teacherRepository.findByUserId(id);

    if (teacherExists) {
      throw new Error('Already an teacher!');
    }

    const teacher = teacherRepository.create({ user_id: id });

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
