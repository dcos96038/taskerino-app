import { BoardInsert } from "@/types/boards";
import { db } from "../../db";
import { boards } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/lib/auth";

type CreateBoardParams = Pick<BoardInsert, "name" | "boardPrefix">;

export const boardsService = {
  create: async (board: CreateBoardParams) => {
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    await db.insert(boards).values({
      ...board,
      authorId: session.user.id,
    });
  },
  getAll: async () => {
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    return await db.query.boards.findMany({
      with: {
        tasks: true,
      },
    });
  },
  get: async (boardId: string) => {
    return await db.query.boards.findFirst({
      where: (boards, { eq }) => eq(boards.id, Number(boardId)),
      with: {
        tasks: true,
      },
    });
  },
  delete: async (boardId: string) => {
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    await db.delete(boards).where(eq(boards.id, Number(boardId)));
  },
};
