import Block from '@modules/subjects/infra/typeorm/entities/Block';
import CreateBlockDTO from '../dtos/CreateBlockDTO';

export default interface IBlocksRepository {
  findById(id: string): Promise<Block | undefined>;
  create(data: CreateBlockDTO): Promise<Block>;
  save(subject: Block): Promise<Block>;
}
