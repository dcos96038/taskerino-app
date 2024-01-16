import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BoardInsert } from "@/types/boards";
import { getServerSession } from "next-auth";
import { db } from "../../db";
import { boards } from "../../db/schema";

type CreateBoardParams = Pick<BoardInsert, "name">;

export const boardsService = {
  create: async (board: CreateBoardParams) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized");

    await db.insert(boards).values({
      ...board,
      authorId: session.user.id,
    });
  },
  getAll: async () => {
    const session = await getServerSession(authOptions);

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
};
