import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  generate(id: string): Promise<UserToken | undefined>;
  findByToken(token: string): Promise<UserToken>;
}
