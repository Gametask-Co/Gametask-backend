import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Milestone from './Milestone';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  milestone_id: string;

  @OneToOne(() => Milestone)
  @JoinColumn({ name: 'milestone_id' })
  milestone: Milestone;

  @Column()
  description: string;

  @Column()
  attachment: string;

  @Column()
  due: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
