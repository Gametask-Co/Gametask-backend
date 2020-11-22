import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar_url) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar_url,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar_url = avatarFileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
