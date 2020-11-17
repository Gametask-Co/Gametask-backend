import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import Task from './Task';
import SubjectClass from './SubjectClass';
import Milestone from './Milestone';

@Entity('blocks')
class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Milestone, () => Block)
  milestone: Milestone;

  @OneToMany(() => Task, () => Block)
  tasks: Task[];

  @OneToMany(() => SubjectClass, () => Block)
  subjectclasses: SubjectClass[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Block;
