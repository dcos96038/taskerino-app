import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  serial,
  mysqlEnum,
  bigint,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  boards: many(boards),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const boards = mysqlTable("board", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  boardPrefix: varchar("boardPrefix", { length: 4 }).unique(),
  authorId: varchar("authorId", { length: 255 })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const boardsRelations = relations(boards, ({ one, many }) => ({
  author: one(users, {
    fields: [boards.authorId],
    references: [users.id],
  }),
  tasks: many(tasks),
}));

export const tasks = mysqlTable("task", {
  id: serial("id").primaryKey(),
  taskId: varchar("taskId", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  status: mysqlEnum("status", [
    "BACKLOG",
    "TODO",
    "IN_PROGRESS",
    "DONE",
    "CANCELLED",
  ]),
  priority: mysqlEnum("priority", ["LOW", "MEDIUM", "HIGH"]),
  label: mysqlEnum("label", ["BUG", "FEATURE", "IMPROVEMENT", "DOCUMENTATION"]),
  boardId: bigint("boardId", {
    unsigned: true,
    mode: "bigint",
  })
    .references(() => boards.id, {
      onDelete: "cascade",
    })
    .notNull(),
  authorId: varchar("authorId", { length: 255 })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),
  board: one(boards, {
    fields: [tasks.boardId],
    references: [boards.id],
  }),
}));
