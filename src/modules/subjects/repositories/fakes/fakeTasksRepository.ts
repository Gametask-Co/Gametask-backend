import { v4 } from 'uuid';
import CreateTaskDTO from '@modules/subjects/dtos/CreateTaskDTO';
import ITasksRepository from '@modules/subjects/repositories/ITasksRepository';
import Task from '@modules/subjects/infra/typeorm/entities/Task';

class TasksRepository implements ITasksRepository {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public async findById(id: string): Promise<Task | undefined> {
    const findTask = this.tasks.find(task => task.id === id);
    return findTask;
  }

  public async create(data: CreateTaskDTO): Promise<Task> {
    const task = new Task();
    Object.assign(task, { id: v4() }, data);
    this.tasks.push(task);
    return task;
  }

  public async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task.id);
    this.tasks[findIndex] = task;
    return task;
  }
}

export default TasksRepository;
