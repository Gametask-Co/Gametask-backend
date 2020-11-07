import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Student from '@modules/students/infra/typeorm/entities/Student';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Teacher, () => Subject)
  teacher: Teacher;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;
