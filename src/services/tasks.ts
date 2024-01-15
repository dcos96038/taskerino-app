import { TaskInsert } from "@/types/tasks";
import { db } from "../../db";
import { tasks } from "../../db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type CreateTaskParams = Pick<
  TaskInsert,
  "label" | "title" | "status" | "priority" | "boardId"
>;

export const tasksService = {
  create: async (task: CreateTaskParams) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized");

    const newTask = {
      ...task,
      taskId: "TASK-123",
      authorId: session.user.id,
    };

    await db.insert(tasks).values(newTask);
  },
};
