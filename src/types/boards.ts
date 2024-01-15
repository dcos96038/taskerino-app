import { createInsertSchema } from "drizzle-zod";
import { boards } from "../../db/schema";

export enum BoardStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}
export type Board = typeof boards._.inferSelect;
export type BoardInsert = typeof boards._.inferInsert;

export const insertBoardSchema = createInsertSchema(boards);
