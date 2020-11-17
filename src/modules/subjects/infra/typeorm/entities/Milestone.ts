import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';

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

  @ManyToOne(() => Subject, () => Block)
  subject: Subject;

  @OneToMany(() => Block, () => Subject)
  blocks: Block[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Milestone;
