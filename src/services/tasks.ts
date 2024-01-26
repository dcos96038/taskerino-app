import { TaskInsert } from "@/types/tasks";
import { db } from "../../db";
import { tasks } from "../../db/schema";
import { count, desc, eq } from "drizzle-orm";
import { getServerSession } from "@/lib/auth";

type CreateTaskParams = Pick<
  TaskInsert,
  "label" | "title" | "status" | "priority" | "boardId" | "taskId"
>;

export const tasksService = {
  create: async (task: CreateTaskParams) => {
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    const newTask = {
      ...task,
      authorId: session.user.id,
    };

    await db.insert(tasks).values(newTask);
  },
  getLastId: async (_boardId: string) => {
    const boardId = BigInt(_boardId);

    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    const [totalTasksFromBoard] = await db
      .select({
        value: count(tasks.id),
      })
      .from(tasks)
      .where(eq(tasks.authorId, session.user.id) && eq(tasks.boardId, boardId));

    return totalTasksFromBoard.value;
  },
  delete: async (taskId: number) => {
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    await db.delete(tasks).where(eq(tasks.id, taskId));
  },
};
