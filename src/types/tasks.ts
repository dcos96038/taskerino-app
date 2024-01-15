import { createInsertSchema } from "drizzle-zod";
import { tasks } from "../../db/schema";
import * as z from "zod";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskLabel {
  BUG = "BUG",
  FEATURE = "FEATURE",
  IMPROVEMENT = "IMPROVEMENT",
  DOCUMENTATION = "DOCUMENTATION",
}

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
}

export type Task = typeof tasks._.inferSelect;
export type TaskInsert = typeof tasks._.inferInsert;

export const insertTaskSchema = createInsertSchema(tasks, {
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    })
    .min(1, "Title must be at least 1 character long."),
  status: z.nativeEnum(TaskStatus, {
    errorMap: () => {
      return { message: "Status must be a valid value." };
    },
  }),
  priority: z.nativeEnum(TaskPriority, {
    errorMap: () => {
      return { message: "Priority must be a valid value." };
    },
  }),
  label: z.nativeEnum(TaskLabel, {
    errorMap: () => {
      return { message: "Label must be a valid value." };
    },
  }),
});
