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

import { Expose } from 'class-transformer';
import Moment from 'moment';

import StudentActivity from '@modules/students/infra/typeorm/entities/StudentActivity';
import moment from 'moment';
import Subject from './Subject';
import Block from './Block';

@Entity('milestones')
class Milestone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  subject_id: string;

  @Column({ default: false })
  isVisible: boolean;

  @Column({ nullable: true })
  deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'progress' })
  getProgress(): string {
    if (this.deadline) {
      const initialDate = moment(this.created_at);
      const finalDate = moment(this.deadline);
      const nowDate = moment();

      const totalDays = moment.duration(initialDate.diff(finalDate)).asDays();
      const passedDays = moment.duration(initialDate.diff(nowDate)).asDays();

      const result = (passedDays / totalDays) * 100;
      return String(result < 0 ? 0 : result);
    }
    return '0';
  }

  @OneToMany(
    () => StudentActivity,
    studentActivity => studentActivity.milestone,
  )
  activities: StudentActivity[];

  @ManyToOne(() => Subject, subject => subject.milestones)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => Block, block => block.milestone, {
    eager: true,
  })
  blocks: Block[];
}

export default Milestone;
