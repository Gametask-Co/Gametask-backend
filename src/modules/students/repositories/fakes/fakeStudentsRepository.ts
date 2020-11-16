import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class StudentsRepository implements IStudentsRepository {
  private students: Student[];

  private users: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.students = [];
    this.users = usersRepository;
  }

  public async findByUserId(id: string): Promise<Student | undefined> {
    const findStudent = this.students.find(student => student.user_id === id);
    return findStudent;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const findUser = await this.users.findByEmail(email);

    if (!findUser) {
      throw new AppError('Student not found!', 400);
    }

    const findStudent = this.students.find(
      student => student.user_id === findUser.id,
    );

    if (!findStudent) {
      throw new AppError('Student not found!', 400);
    }

    return findStudent;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const findStudent = this.students.find(student => student.id === id);
    return findStudent;
  }

  public async create(id: string): Promise<Student> {
    const student = new Student();
    Object.assign(student, { id: v4() }, { user_id: id });
    this.students.push(student);
    return student;
  }

  public async save(student: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === student.id,
    );
    this.students[findIndex] = student;
    return student;
  }
}

export default StudentsRepository;
