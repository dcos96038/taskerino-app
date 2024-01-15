"use server";

import { insertTaskSchema } from "@/types/tasks";
import { tasksService } from "@/services/tasks";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const requestSchema = insertTaskSchema.pick({
  title: true,
  status: true,
  priority: true,
  label: true,
});

export async function createTask(prevState: any, formData: FormData) {
  const validatedData = requestSchema.safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    label: formData.get("label"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }

  try {
    await tasksService.create({
      ...validatedData.data,
      boardId: BigInt(123),
    });
  } catch (error) {
    return {
      message: "Database error, failed to Create Task.",
    };
  }

  revalidatePath("/");
  redirect("..");
  return {
    message: null,
  };
}
