import { tasks } from "../../db/schema";

export type Task = typeof tasks._.inferSelect;

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
