import { UserEntityEmailError, UserEntityUserNameError } from "../error/user.error";

export class UserName {
  readonly value: string;

  constructor(value: string) {
    if (value.trim().length === 0) {
      throw new UserEntityUserNameError();
    }
    if (value.length > 50) {
      throw new UserEntityUserNameError();
    }

    this.value = value;
  }
}

export class Email {
  readonly value: string;

  constructor(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new UserEntityEmailError();
    }

    this.value = value;
  }
}