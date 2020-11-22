import { v4 } from 'uuid';
import CreateBlockDTO from '@modules/subjects/dtos/CreateBlockDTO';

import IBlocksRepository from '@modules/subjects/repositories/IBlocksRepository';
import Block from '@modules/subjects/infra/typeorm/entities/Block';

class BlocksRepository implements IBlocksRepository {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  public async findById(id: string): Promise<Block | undefined> {
    const findBlock = this.blocks.find(block => block.id === id);
    return findBlock;
  }

  public async create(data: CreateBlockDTO): Promise<Block> {
    const block = new Block();
    Object.assign(block, { id: v4() }, data);
    this.blocks.push(block);
    return block;
  }

  public async save(block: Block): Promise<Block> {
    const findIndex = this.blocks.findIndex(
      findBlock => findBlock.id === block.id,
    );
    this.blocks[findIndex] = block;
    return block;
  }
}

export default BlocksRepository;
