import CreateTaskDTO from '@modules/subjects/dtos/CreateTaskDTO';
import ITasksRepository from '@modules/subjects/repositories/ITasksRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Subject from '../entities/Subject';
import Task from '../entities/Task';
import Block from '../entities/Block';
import Milestone from '../entities/Milestone';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  private blocksRepository: Repository<Block>;

  private milestonesRepository: Repository<Milestone>;

  private subjectsRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Task);
    this.blocksRepository = getRepository(Block);
    this.milestonesRepository = getRepository(Milestone);
    this.subjectsRepository = getRepository(Subject);
  }

  public async whichSubject(task_id: string): Promise<Subject | undefined> {
    try {
      const task = await this.ormRepository.findOne({ where: { id: task_id } });
      const block = await this.blocksRepository.findOneOrFail({
        where: { id: task.block_id },
      });

      const milestone = await this.milestonesRepository.findOneOrFail({
        where: { id: block.milestone_id },
      });

      return this.subjectsRepository.findOneOrFail({
        where: { id: milestone.subject_id },
        relations: ['students'],
      });
    } catch (err) {
      throw new AppError('Subject not found!', 400);
    }
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
