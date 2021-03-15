import Block from '@modules/subjects/infra/typeorm/entities/Block';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';
import SubjectClass from '@modules/subjects/infra/typeorm/entities/SubjectClass';
import Task from '@modules/subjects/infra/typeorm/entities/Task';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import CreateStudentActivityDTO from '../dtos/CreateStudentActivityDTO';
import Student from '../infra/typeorm/entities/Student';

import StudentActivity from '../infra/typeorm/entities/StudentActivity';
import IStudentsActivityRepository from '../repositories/IStudentsActivityRepository';
import IStudentsRepository from '../repositories/IStudentsRepository';

@injectable()
class CreateStudentActivity {
  private studentsAcitvityRepository: IStudentsActivityRepository;

  private studentsRepository: IStudentsRepository;

  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('StudentsActivityRepository')
    studentsAcitvityRepository: IStudentsActivityRepository,
    @inject('StudentsRepository')
    studentsRepository: IStudentsRepository,
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.studentsAcitvityRepository = studentsAcitvityRepository;
    this.studentsRepository = studentsRepository;
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    student_id,
    subject_id,
    milestone_id,
    block_id,
    subjectclass_id,
    task_id,
  }: CreateStudentActivityDTO): Promise<StudentActivity> {
    if (!task_id && !subjectclass_id) {
      throw new AppError('Must provide task id or subjectClass id!', 422);
    }

    const studentExists = await this.studentsRepository.findById(student_id);

    if (!studentExists) {
      throw new AppError('Student not found!', 400);
    }

    const subjectExists = await this.subjectsRepository.findById(subject_id);

    if (!subjectExists) {
      throw new AppError('Subject not found!', 400);
    }

    const studentBelongsToSubject = subjectExists.students.find(
      (student: Student) => student.id === student_id,
    );

    if (!studentBelongsToSubject) {
      throw new AppError('Student do not belong to subject!', 400);
    }

    const milestoneExists = subjectExists.milestones.find(
      (milestone: Milestone) => milestone.id === milestone_id,
    );

    if (!milestoneExists) {
      throw new AppError('Milestone not found!', 400);
    }

    const blockExists = milestoneExists.blocks.find(
      (block: Block) => block.id === block_id,
    );

    if (!blockExists) {
      throw new AppError('Block not found!', 400);
    }

    const subjectClassExists = blockExists.subjectclasses.find(
      (subjectClass: SubjectClass) => subjectClass.id === subjectclass_id,
    );

    const taskExists = blockExists.tasks.find(
      (task: Task) => task.id === task_id,
    );

    if (!subjectClassExists && !taskExists) {
      throw new AppError('Task or Subject not found!');
    }

    const studentActivityExists = await this.studentsAcitvityRepository.find({
      student_id,
      subject_id,
      milestone_id,
      block_id,
      subjectclass_id,
      task_id,
    });

    if (studentActivityExists) {
      throw new AppError('Student activity already exists!', 400);
    }

    const studentActivity = await this.studentsAcitvityRepository.create({
      student_id,
      subject_id,
      milestone_id,
      block_id,
      subjectclass_id,
      task_id,
    });

    return studentActivity;
  }
}

export default CreateStudentActivity;
