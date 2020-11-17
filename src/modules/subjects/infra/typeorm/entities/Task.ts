import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import Block from './Block';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  due: Date;

  @Column({ nullable: true })
  attachment_url: string;

  @Column({ default: 0 })
  total_score: number;

  @Column()
  block_id: string;

  @ManyToOne(() => Block, () => Task)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
