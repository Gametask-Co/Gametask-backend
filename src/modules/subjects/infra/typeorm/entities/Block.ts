import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import StudentActivity from '@modules/students/infra/typeorm/entities/StudentActivity';
import Task from './Task';
import SubjectClass from './SubjectClass';
import Milestone from './Milestone';

@Entity('blocks')
class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  milestone_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => StudentActivity, studentActivity => studentActivity.block)
  activities: StudentActivity[];

  @ManyToOne(() => Milestone, milestone => milestone.blocks)
  @JoinColumn({ name: 'milestone_id' })
  milestone: Milestone;

  @OneToMany(() => Task, task => task.block, { eager: true })
  tasks: Task[];

  @OneToMany(() => SubjectClass, subjectClass => subjectClass.block, {
    eager: true,
  })
  subjectclasses: SubjectClass[];
}

export default Block;
