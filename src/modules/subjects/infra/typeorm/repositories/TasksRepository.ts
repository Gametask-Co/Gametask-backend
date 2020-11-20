import CreateTaskDTO from '@modules/subjects/dtos/CreateTaskDTO';
import ITasksRepository from '@modules/subjects/repositories/ITasksRepository';
import { getRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: { id },
    });
    return task;
  }

  public async create(data: CreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(data);
    await this.ormRepository.save(task);
    return task;
  }

  public async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }
}

export default TasksRepository;
