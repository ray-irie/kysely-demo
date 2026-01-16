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
table "posts" {
  schema = schema.hono_db
  column "id" {
    null           = false
    type           = int
    auto_increment = true
  }
  column "title" {
    null = false
    type = varchar(255)
  }
  column "owner_id" {
    type = int
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "owner_id" {
    columns     = [column.owner_id]
    ref_columns = [table.users.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
}
schema "hono_db" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
