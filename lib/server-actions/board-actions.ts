"use server";

import { Column } from "@/app/types";
import prisma from "../db";
import { revalidatePath } from "next/cache";

const updateColumnColor = async (columnId: string, color: string) => {
  try {
    await prisma.column.update({
      where: {
        id: columnId,
      },
      data: {
        color,
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    console.error("Error updating column color:", error);
    throw new Error("Failed to update column color");
  }
};

const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      select: {
        id: true,
        title: true,
        columns: {
          select: {
            id: true,
            title: true,
            color: true,
          },
        },
      },
    });
    return boards;
  } catch (error) {
    throw new Error("Failed to get boards");
  }
};

const getBoardById = async (boardId: string) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
    return board;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw new Error(`Failed to get board ${boardId}`);
  }
};

const createBoard = async (title: string, columns: Column[]) => {
  await prisma.board.create({
    data: {
      title,
      columns: {
        create: columns.map((column) => ({
          title: column.title,
          color: column.color,
        })),
      },
    },
  });

  revalidatePath(`/`);
};

const updateBoard = async (id: string, title: string, columns: Column[]) => {
  try {
    return await prisma.board.update({
      where: { id },
      data: {
        title,
        columns: {
          deleteMany: {},
          create: columns.map((column) => ({
            title: column.title,
            color: column.color,
          })),
        },
      },
      select: {
        id: true,
        title: true,
        columns: {
          select: {
            id: true,
            title: true,
            color: true,
          },
        },
      },
    });

    revalidatePath(`/board/${id}`);
  } catch (error) {
    console.error("Error updating Board:", error);
    throw new Error("Failed to update Board");
  }
};

const deleteBoardById = async (boardId: string) => {
  try {
    await prisma.board.delete({
      where: { id: boardId },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting Board:", error);
    throw new Error("Failed to delete Board");
  }
};

export { createBoard, updateBoard, updateColumnColor, getBoardById, getBoards, deleteBoardById };
