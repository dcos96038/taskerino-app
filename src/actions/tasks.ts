"use server";

import { insertTaskSchema } from "@/types/tasks";
import { tasksService } from "@/services/tasks";
import { revalidatePath } from "next/cache";

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
    await tasksService.create({
      ...data,
      boardId: BigInt(data.boardId),
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/${data.boardId}`);
}
