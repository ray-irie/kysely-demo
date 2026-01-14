import { Insertable, Updateable } from "kysely";
import { Users } from "../../generated/kysely/db";
import { UserEntity } from "../domain/user/entity/user.entity";
import { Email, UserName } from "../domain/user/valueObject/user.value-object";
import { db } from "./database";

export class UserRepository implements UserRepository {
	constructor() {}

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
	async getById(id: number): Promise<UserEntity> {}

	async create(user: UserEntity): Promise<UserEntity> {}
}
