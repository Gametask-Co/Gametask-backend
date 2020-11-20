import Task from '@modules/subjects/infra/typeorm/entities/Task';
import CreateTaskDTO from '@modules/subjects/dtos/CreateTaskDTO';

export default interface ITasksRepository {
  findById(id: string): Promise<Task | undefined>;
  create(data: CreateTaskDTO): Promise<Task>;
  save(subject: Task): Promise<Task>;
}
