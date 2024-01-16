import { createInsertSchema } from "drizzle-zod";
import { boards } from "../../db/schema";
import { Task } from "./tasks";

export enum BoardStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}
export type Board = typeof boards._.inferSelect;
export type BoardInsert = typeof boards._.inferInsert;
export type BoardWithTasks = Board & {
  tasks: Array<Task>;
};

export const insertBoardSchema = createInsertSchema(boards);
