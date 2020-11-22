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

  @ManyToOne(() => Milestone, milestone => milestone.blocks)
  @JoinColumn({ name: 'milestone_id' })
  milestone: Milestone;

  @OneToMany(() => Task, task => task.block)
  tasks: Task[];

  @OneToMany(() => SubjectClass, subjectClass => subjectClass.block)
  subjectclasses: SubjectClass[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Block;
