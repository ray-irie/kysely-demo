import type { UserEntity } from "../domain/user/entity/user.entity";

export interface IUserRepository {
  findById(id: number): Promise<UserEntity | null>;
  getById(id: number): Promise<UserEntity>;
  create(user: UserEntity): Promise<UserEntity | null>;
}
