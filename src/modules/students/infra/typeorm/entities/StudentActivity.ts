import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Student from '@modules/students/infra/typeorm/entities/Student';
import SubjectClass from '@modules/subjects/infra/typeorm/entities/SubjectClass';
import Task from '@modules/subjects/infra/typeorm/entities/Task';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Milestone from '@modules/subjects/infra/typeorm/entities/Milestone';
import Block from '@modules/subjects/infra/typeorm/entities/Block';

@Entity('student_activity')
class StudentActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @Column()
  subject_id: string;

  @Column()
  milestone_id: string;

  @Column()
  block_id: string;

  @Column({ nullable: true })
  subjectclass_id: string;

  @Column({ nullable: true })
  task_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Student, student => student.activities)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Subject, subject => subject.activities)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Milestone, milestone => milestone.activities)
  @JoinColumn({ name: 'milestone_id' })
  milestone: string;

  @ManyToOne(() => Block, block => block.activities)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @ManyToOne(() => SubjectClass)
  @JoinColumn({ name: 'subjectclass_id' })
  subjectclass: SubjectClass;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;
}

export default StudentActivity;
