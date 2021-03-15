import Task from '@modules/subjects/infra/typeorm/entities/Task';
import CreateTaskDTO from '@modules/subjects/dtos/CreateTaskDTO';
import Subject from '../infra/typeorm/entities/Subject';

export default interface ITasksRepository {
  findById(id: string): Promise<Task | undefined>;
  whichSubject(task_id: string): Promise<Subject | undefined>;
  create(data: CreateTaskDTO): Promise<Task>;
  save(subject: Task): Promise<Task>;
}
