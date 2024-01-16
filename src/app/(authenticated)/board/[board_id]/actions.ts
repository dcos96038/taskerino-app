"use server";

import { insertTaskSchema } from "@/types/tasks";
import { tasksService } from "@/services/tasks";
import { revalidatePath } from "next/cache";
import { boardsService } from "@/services/boards";
import { redirect } from "next/navigation";

const requestSchema = insertTaskSchema.pick({
  title: true,
  status: true,
  priority: true,
  label: true,
  boardId: true,
});

export async function createTask(formData: FormData) {
  const data = requestSchema.parse({
    title: formData.get("title"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    label: formData.get("label"),
    boardId: formData.get("boardId"),
  });

  try {
    const newTaskId = await tasksService.getLastId(data.boardId);
    const board = await boardsService.get(data.boardId);

    if (!board) throw new Error("Board not found");

    const boardPrefix = board.boardPrefix;

    let taskId = `${boardPrefix}-${newTaskId + 1}`;

    await tasksService.create({
      ...data,
      taskId,
      boardId: BigInt(data.boardId),
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/board/${data.boardId}`);
}

export async function deleteBoard(formData: FormData) {
  const boardId = formData.get("boardId") as string;

  if (!boardId) throw new Error("Board ID not found");

  await boardsService.delete(boardId);

  revalidatePath(`/board/${boardId}`);
  redirect("/");
}

export async function deleteTask(formData: FormData) {
  const taskId = Number(formData.get("taskId"));
  const boardId = formData.get("boardId") as string;

  if (!boardId) throw new Error("Board ID not found");
  if (!taskId) throw new Error("Task ID not found");

  await tasksService.delete(taskId);
  revalidatePath(`/board/${boardId}`);
}
