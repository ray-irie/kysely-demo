import type { UserEntity } from "../domain/user/entity/user.entity";

export interface UserRepository {
	findById(id: number): Promise<UserEntity | null>;
	getById(id: number): Promise<UserEntity>;
	create(user: UserEntity): Promise<UserEntity | null>;
	findPostsByUserId(userId: number): Promise<Array<{ id: number; title: string; owner_id: number | null }>>;
	findPostsWithOwner(userId: number): Promise<Array<{ post: { id: number; title: string; owner_id: number | null }; user: { id: number; name: string; email: string } | null }>>;
}
