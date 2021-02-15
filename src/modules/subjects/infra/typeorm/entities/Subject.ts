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
  JoinColumn,
  InsertEvent,
  BeforeInsert,
} from 'typeorm';

import { v4 as uuid_v4 } from 'uuid';

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

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher, () => Subject)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'subjects_students',
    joinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: Student[];

  @OneToMany(() => Milestone, milestone => milestone.subject)
  milestones: Milestone[];

  @Column({ nullable: true })
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeInsert(_: InsertEvent<Subject>): void {
    this.code = uuid_v4();
  }
}

export default Subject;
