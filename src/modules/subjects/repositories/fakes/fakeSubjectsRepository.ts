import { v4 } from 'uuid';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import CreateSubjectDTO from '@modules/subjects/dtos/CreateSubjectDTO';

class SubjectRepository implements ISubjectsRepository {
  private subjects: Subject[];

  constructor() {
    this.subjects = [];
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const findSubject = this.subjects.find(subject => subject.id === id);
    return findSubject;
  }

  public async findAllByTeacherId(id: string): Promise<Subject[] | undefined> {
    const findSubjects = this.subjects.map(subject => {
      return subject.teacher.id === id ? subject : undefined;
    });
    return findSubjects;
  }

  public async findAllByStudentId(id: string): Promise<Subject[] | undefined> {
    const findSubjects = this.subjects.map(subject => {
      if (subject.students.find(student => student.id === id)) {
        return subject;
      }
      return undefined;
    });
    return findSubjects;
  }

  public async create(data: CreateSubjectDTO): Promise<Subject> {
    const subject = new Subject();
    Object.assign(subject, { id: v4() }, data);
    this.subjects.push(subject);
    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    const findIndex = this.subjects.findIndex(
      findSubject => findSubject.id === subject.id,
    );
    this.subjects[findIndex] = subject;
    return subject;
  }

  public async isOwner(
    teacher_id: string,
    subject_id: string,
  ): Promise<Subject | undefined> {
    const findSubject = this.subjects.find(
      subject => subject.id === subject_id && subject.teacher_id === teacher_id,
    );
    return findSubject;
  }
}

export default SubjectRepository;
