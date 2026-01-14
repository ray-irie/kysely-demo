import { Hono } from "hono";
import posts from "./http/posts/posts";
import users from "./http/users/users";

const app = new Hono();

const routes = app.route("/users", users).route("/posts", posts);

export default app;
export type AppType = typeof routes;
