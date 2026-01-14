import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import type { DB } from "../../generated/kysely/db";

const dialect = new MysqlDialect({
	pool: createPool({
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		port: 3306,
		connectionLimit: 10,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});
