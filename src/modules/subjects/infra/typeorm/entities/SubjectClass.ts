import StudentActivity from '@modules/students/infra/typeorm/entities/StudentActivity';
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

import Block from './Block';

@Entity('subjectclasses')
class SubjectClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  attachment_url: string;

  @Column()
  block_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Block, block => block.subjectclasses)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @OneToMany(
    () => StudentActivity,
    studentActivity => studentActivity.subjectclass,
    { eager: true },
  )
  activities: StudentActivity[];
}

export default SubjectClass;
