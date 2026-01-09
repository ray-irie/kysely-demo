import { z } from "zod";

// getUser
export const GetUserInputSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// postUser
export const PostUserInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
});
