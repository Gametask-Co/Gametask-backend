import Student from '@modules/students/infra/typeorm/entities/Student';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  teacher_id: string;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column({ nullable: true })
  student_id: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
