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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;
