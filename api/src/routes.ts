import { Hono } from "hono";
import users from "./http/users/users";
import posts from "./http/posts/posts";

const app = new Hono();

const routes = app.route("/users", users).route("/posts", posts);

export default app;
export type AppType = typeof routes;
