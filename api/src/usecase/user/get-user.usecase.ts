import type { IUserRepository } from "../../repository/user.repository";
import type { UserDTO } from "./dto/user.dto";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<UserDTO> {
    const userEntity = await this.userRepository.getById(id);
    return {
      id: userEntity.id,
      name: userEntity.name.value,
      email: userEntity.email.value,
    };
  }
}
