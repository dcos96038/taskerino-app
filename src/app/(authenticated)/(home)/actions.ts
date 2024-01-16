"use server";

import { revalidatePath } from "next/cache";
import { insertBoardSchema } from "@/types/boards";
import { boardsService } from "@/services/boards";

const requestSchema = insertBoardSchema.pick({
  name: true,
  boardPrefix: true,
});

export async function createBoard(formData: FormData) {
  const data = requestSchema.parse({
    name: formData.get("name"),
    boardPrefix: formData.get("boardPrefix"),
  });

  try {
    await boardsService.create({
      ...data,
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
}
