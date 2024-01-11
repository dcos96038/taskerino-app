import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});
