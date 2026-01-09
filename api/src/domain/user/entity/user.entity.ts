import { UserName, Email } from "../valueObject/user.value-object";

// Entityはドメインが守られていることを保証された状態
// DBアクセスを使ったバリデーションもUseCase内で済ませてからEntityを生成する
export class UserEntity {
  // create時には存在しないのでnullable
  readonly id?: number;
  readonly name: UserName;
  readonly email: Email;

  constructor(params: { id?: number; name: UserName; email: Email }) {
    this.id = params.id
    this.name = params.name;
    this.email = params.email;
  }
}
