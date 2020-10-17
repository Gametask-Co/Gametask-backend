import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Student from '../models/Student';
import User from '../models/User';

interface RequestDTO {
  id: string;
}

class CreateStudentService {
  public async execute({ id }: RequestDTO): Promise<Student> {
    const userRepository = getRepository(User);
    const userExists = userRepository.findOne({ id });

    if (!userExists) {
      throw new Error('User not found!');
    }

    const studentRepository = getRepository(Student);

    const studentExists = await studentRepository.findOne({
      where: { user_id: id },
    });

    if (studentExists) {
      throw new Error('Already an Student!');
    }

    const student = studentRepository.create({ user_id: id });

    await studentRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
