import { Repository, getRepository } from 'typeorm';

import IStudentsActivityRepository from '@modules/students/repositories/IStudentsActivityRepository';

import Student from '@modules/students/infra/typeorm/entities/Student';
import CreateStudentActivityDTO from '@modules/students/dtos/CreateStudentActivityDTO';
import FindStudentActivityDTO from '@modules/students/dtos/FindStudentActivityDTO';
import { cleanUndefined } from '@shared/helper/functions';
import StudentActivity from '../entities/StudentActivity';

class StudentActivityRepository implements IStudentsActivityRepository {
  private ormRepository: Repository<StudentActivity>;

  private studentsRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(StudentActivity);
    this.studentsRepository = getRepository(Student);
  }

  // async findAllBlockStudentsActivity();

  // async findAllMilestoneStudentsActivity();

  // async findAllSubjectStudentsActivity();

  // async findMilestonesStudentAcitivty();

  // async findSubjectStudentActivity() {}

  async findAllStudentActivity(
    student_id: string,
  ): Promise<StudentActivity[] | []> {
    return this.ormRepository.find({
      where: {
        student_id,
      },
    });
  }

  async find({
    student_id,
    subject_id,
    milestone_id,
    block_id,
    task_id,
    subjectclass_id,
  }: FindStudentActivityDTO): Promise<StudentActivity | undefined> {
    const data = cleanUndefined({
      student_id,
      subject_id,
      milestone_id,
      block_id,
      task_id,
      subjectclass_id,
    });

    return this.ormRepository.findOne({
      where: data,
    });
  }

  async create(data: CreateStudentActivityDTO): Promise<StudentActivity> {
    const studentActivity = this.ormRepository.create(data);
    await this.ormRepository.save(studentActivity);
    return studentActivity;
  }

  async save(studentActivity: StudentActivity): Promise<StudentActivity> {
    return this.ormRepository.save(studentActivity);
  }
}

export default StudentActivityRepository;
