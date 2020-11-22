import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CreateTaskDTO from '../dtos/CreateTaskDTO';
import Task from '../infra/typeorm/entities/Task';
import IBlocksRepository from '../repositories/IBlocksRepository';
import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
class CreateTaskService {
  private tasksRepository: ITasksRepository;

  private blocksRepository: IBlocksRepository;

  constructor(
    @inject('TasksRepository')
    tasksRepository: ITasksRepository,
    @inject('BlocksRepository')
    blocksRepository: IBlocksRepository,
  ) {
    this.tasksRepository = tasksRepository;
    this.blocksRepository = blocksRepository;
  }

  public async execute(data: CreateTaskDTO): Promise<Task> {
    const { block_id } = data;
    const findBlock = await this.blocksRepository.findById(block_id);

    if (!findBlock) {
      throw new AppError('Block not found');
    }

    const task = await this.tasksRepository.create(data);
    return task;
  }
}

export default CreateTaskService;
