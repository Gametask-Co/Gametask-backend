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

  @ManyToOne(() => Block, block => block.subjectclasses)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubjectClass;
