export class UserNotFoundError extends Error {
	constructor() {
		super(`User not found`);
	}
}

export class UserEntityUserNameError extends Error {
	constructor() {
		super(`Invalid Username`);
	}
}

export class UserEntityEmailError extends Error {
	constructor() {
		super(`Invalid Email`);
	}
}
