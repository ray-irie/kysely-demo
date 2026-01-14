import { Hono } from "hono";
import { prisma } from "../../../prisma/prisma";
import { UserEntityEmailError } from "../../domain/user/error/user.error";
import { PrismaUserRepository } from "../../infrastructure/user.repository";
import { CreateUserUseCase } from "../../usecase/user/create-user.usecase";
import { GetUserUseCase } from "../../usecase/user/get-user.usecase";
import { GetUserInputSchema, PostUserInputSchema } from "./schema";

const userRepository = new PrismaUserRepository(prisma);
const getUserUseCase = new GetUserUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);

const app = new Hono()
	.get("/:id", async (c) => {
		// http validation(ドメインのバリデーションはここでは行わない)
		const { id } = GetUserInputSchema.parse(c.req.param);

		const user = await getUserUseCase.execute(id);

		if (!user) {
			return c.json({ error: "User not found" }, 404);
		}

		return c.json(user);
	})
	.post("/", async (c) => {
		const { name, email } = PostUserInputSchema.parse(c.req.parseBody);

		try {
			const user = await createUserUseCase.execute({
				name: name,
				email: email,
			});
			return c.json(user);
		} catch (e) {
			if (e instanceof UserEntityEmailError) {
				return;
			}
		}
	});

export default app;
