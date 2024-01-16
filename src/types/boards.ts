import { createInsertSchema } from "drizzle-zod";
import { boards } from "../../db/schema";
import { Task } from "./tasks";
import * as z from "zod";

export enum BoardStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}
export type Board = typeof boards._.inferSelect;
export type BoardInsert = typeof boards._.inferInsert;
export type BoardWithTasks = Board & {
  tasks: Array<Task>;
};

export const insertBoardSchema = createInsertSchema(boards, {
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Min length 1")
    .max(255, "Max length 255"),
  boardPrefix: z
    .string({
      required_error: "Board prefix is required",
      invalid_type_error: "Board prefix must be a string",
    })
    .min(1, "Min length 1")
    .max(4, "Max length 4"),
});
