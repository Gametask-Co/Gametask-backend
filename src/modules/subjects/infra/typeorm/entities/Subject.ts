import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Milestone from './Milestone';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  background_url: string;

  @ManyToOne(() => Teacher, () => Subject)
  teacher: Teacher;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @OneToMany(() => Milestone, () => Subject)
  milestones: Milestone[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;
