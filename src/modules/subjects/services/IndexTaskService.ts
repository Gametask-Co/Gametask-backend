import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import Task from '../infra/typeorm/entities/Task';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import ITasksRepository from '../repositories/ITasksRepository';

interface RequestDTO {
  task_id: string;
  user_id: string;
}

@injectable()
class IndexTaskService {
  private tasksRepository: ITasksRepository;

  private usersRepository: IUsersRepository;

  private subjectsRepository: ISubjectsRepository;

  constructor(
    @inject('TasksRepository')
    tasksRepository: ITasksRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('SubjectsRepository')
    subjectsRepository: ISubjectsRepository,
  ) {
    this.tasksRepository = tasksRepository;
    this.usersRepository = usersRepository;
    this.subjectsRepository = subjectsRepository;
  }

  public async execute({
    task_id,
    user_id,
  }: RequestDTO): Promise<Task | undefined> {
    const task = this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('Task not found!', 400);
    }

    const user = await this.usersRepository.findById(user_id);
    const subject = await this.tasksRepository.whichSubject(task_id);

    if (!subject || !user) {
      throw new AppError('Task not found!', 400);
    }

    const isOwner = await this.subjectsRepository.isOwner(
      user.teacher_id,
      subject.id,
    );

    const response = await classToClass(task);
    response.progress = await Promise.resolve(response.progress);
    return isOwner ? response : undefined;
  }
}

export default IndexTaskService;
