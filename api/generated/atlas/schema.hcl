table "users" {
  schema = schema.hono_db
  column "id" {
    null           = false
    type           = int
    auto_increment = true
  }
  column "name" {
    null = false
    type = varchar(255)
  }
  column "email" {
    null = false
    type = varchar(255)
  }
  primary_key {
    columns = [column.id]
  }
}
schema "hono_db" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
