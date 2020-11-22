import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CreateSubjectClassDTO from '../dtos/CreateSubjectClassDTO';
import SubjectClass from '../infra/typeorm/entities/SubjectClass';
import IBlocksRepository from '../repositories/IBlocksRepository';
import ISubjectClassesRepository from '../repositories/ISubjectClassesRepository';

@injectable()
class CreateSubjectClassService {
  private subjectClassesRepository: ISubjectClassesRepository;

  private blocksRepository: IBlocksRepository;

  constructor(
    @inject('SubjectClassesRepository')
    subjectClassesRepository: ISubjectClassesRepository,
    @inject('BlocksRepository')
    blocksRepository: IBlocksRepository,
  ) {
    this.subjectClassesRepository = subjectClassesRepository;
    this.blocksRepository = blocksRepository;
  }

  public async execute(data: CreateSubjectClassDTO): Promise<SubjectClass> {
    const { block_id } = data;

    const findBlock = await this.blocksRepository.findById(block_id);

    if (!findBlock) {
      throw new AppError('Block not found');
    }

    const subjectClass = await this.subjectClassesRepository.create(data);

    return subjectClass;
  }
}

export default CreateSubjectClassService;
