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

  async findPostsByUserId(userId: number) {
    const posts = await db
      .selectFrom("posts")
      .where("owner_id", "=", userId)
      .selectAll()
      .execute();

    return posts;
  }

  async findPostsWithOwner(userId: number) {
    const results = await db
      .selectFrom("posts")
      .leftJoin("users", "posts.owner_id", "users.id")
      .where("posts.owner_id", "=", userId)
      .select([
        "posts.id as post_id",
        "posts.title as post_title",
        "posts.owner_id as post_owner_id",
        "users.id as user_id",
        "users.name as user_name",
        "users.email as user_email",
      ])
      .execute();

    return results.map(row => ({
      post: {
        id: row.post_id,
        title: row.post_title,
        owner_id: row.post_owner_id,
      },
      user: row.user_id ? {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
      } : null,
    }));
  }
}
