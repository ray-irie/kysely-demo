import { PrismaClient } from "../../generated/prisma/client";
import type { IUserRepository } from "../repository/user.repository";
import { UserEntity } from "../domain/user/entity/user.entity";
import { Email, UserName } from "../domain/user/valueObject/user.value-object";
import { UserNotFoundError } from "../domain/user/error/user.error";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // nullを許容する
  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true },
    });

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
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: { id: true, email: true, name: true },
      });
      return new UserEntity({
        id: user.id,
        name: new UserName(user.name),
        email: new Email(user.email),
      });
    } catch {
      throw new UserNotFoundError();
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name.value,
        email: user.email.value,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return new UserEntity({
      id: created.id,
      name: new UserName(created.name),
      email: new Email(created.email),
    });
  }

}
