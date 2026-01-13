table "users" {
  schema = schema.hono_db
  column "id" {
    null           = false
    type           = int
    auto_increment = true
  }
  column "name" {
    null = true
    type = varchar(255)
  }
  column "age" {
    null = false
    type = int
  }
  primary_key {
    columns = [column.id]
  }
}
schema "hono_db" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
