import { TaskInsert } from "@/types/tasks";
import { db } from "../../db";
import { tasks } from "../../db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { count, desc, eq } from "drizzle-orm";

type CreateTaskParams = Pick<
  TaskInsert,
  "label" | "title" | "status" | "priority" | "boardId" | "taskId"
>;

export const tasksService = {
  create: async (task: CreateTaskParams) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized");

    const newTask = {
      ...task,
      authorId: session.user.id,
    };

    await db.insert(tasks).values(newTask);
  },
  getLastId: async (_boardId: string) => {
    const boardId = BigInt(_boardId);

    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized");

    const [totalTasksFromBoard] = await db
      .select({
        value: count(tasks.id),
      })
      .from(tasks)
      .where(eq(tasks.authorId, session.user.id) && eq(tasks.boardId, boardId));

    return totalTasksFromBoard.value;
  },
};
