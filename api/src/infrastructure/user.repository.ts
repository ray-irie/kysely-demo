import { UserEntity } from "../domain/user/entity/user.entity";
import { Email, UserName } from "../domain/user/valueObject/user.value-object";
import { db } from "./database";

export class UserRepository implements UserRepository {
  // nullを許容する
  async findById(id: number): Promise<UserEntity | null> {
    const user = await db
      .selectFrom("users")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: new UserName(user.name),
      email: new Email(user.email),
    });
  }

  // nullを許容しない
  async getById(id: number): Promise<UserEntity> {
    const user = await db
      .selectFrom("users")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();

    return new UserEntity({
      id: user.id,
      name: new UserName(user.name),
      email: new Email(user.email),
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userResult = await db
      .insertInto("users")
      .values({
        name: user.name.value,
        email: user.email.value,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return new UserEntity({
      id: userResult.id,
      name: new UserName(userResult.name),
      email: new Email(userResult.email),
    });
  }
}
