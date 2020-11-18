import { getRepository, Repository } from 'typeorm';

import CreateBlockDTO from '@modules/subjects/dtos/CreateBlockDTO';

import IBlocksRepository from '@modules/subjects/repositories/IBlocksRepository';
import Block from '../entities/Block';

class BlocksRepository implements IBlocksRepository {
  private ormRepository: Repository<Block>;

  constructor() {
    this.ormRepository = getRepository(Block);
  }

  public async findById(id: string): Promise<Block | undefined> {
    const block = await this.ormRepository.findOne({
      where: { id },
      relations: ['tasks', 'subjectclasses'],
    });

    return block;
  }

  public async create(data: CreateBlockDTO): Promise<Block> {
    const block = this.ormRepository.create(data);
    await this.ormRepository.save(block);
    return block;
  }

  public async save(block: Block): Promise<Block> {
    return this.ormRepository.save(block);
  }
}

export default BlocksRepository;
