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
  milestone_id: string;

  @ManyToOne(() => Milestone, () => Block)
  @JoinColumn({ name: 'milestone_id' })
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
