import { UserEntity } from "../../domain/user/entity/user.entity";
import {
	Email,
	UserName,
} from "../../domain/user/valueObject/user.value-object";
import type { IUserRepository } from "../../repository/user.repository";
import type { UserDTO } from "../user/dto/user.dto";

type CreateUserUseCaseInput = {
	name: string;
	email: string;
};

export class CreateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(input: CreateUserUseCaseInput): Promise<UserDTO> {
		// DBアクセスを伴う重複チェックや存在確認があればここでやる

		const creatingUser = new UserEntity({
			name: new UserName(input.name),
			email: new Email(input.email),
		});

		const createdUser = await this.userRepository.create(creatingUser);
		return {
			id: createdUser.id,
			name: createdUser.name.value,
			email: createdUser.email.value,
		};
	}
}
