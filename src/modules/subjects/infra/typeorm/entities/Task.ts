import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import TasksRepository from '@modules/subjects/infra/typeorm/repositories/TasksRepository';
import StudentActivity from '@modules/students/infra/typeorm/entities/StudentActivity';
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  progress: string;

  @Expose({ name: 'progress' })
  async getProgress(): Promise<string> {
    const tasksRepository = new TasksRepository();
    const subject = await tasksRepository.whichSubject(this.id);
    return String((this.activities.length / subject.students.length) * 100);
  }

  @ManyToOne(() => Block, block => block.tasks)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @OneToMany(() => StudentActivity, studentActivity => studentActivity.task, {
    eager: true,
  })
  activities: StudentActivity[];
}

export default Task;
