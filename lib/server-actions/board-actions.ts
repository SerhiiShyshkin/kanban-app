"use server";

import { Column } from "@prisma/client";
import prisma from "../db";
import { revalidatePath } from "next/cache";

const updateColor = async (id: string, color: string) => {
  try {
    const updatedColor = await prisma.column.update({
      where: {
        id: id,
      },
      data: {
        color,
      },
    });
    console.log(updatedColor);

    revalidatePath(`/board/${id}`);
    return updatedColor;
  } catch (error) {
    console.log(error);
  }
};

const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        columns: true,
      },
    });
    return boards;
  } catch (error) {
    throw new Error("Failed to get boards");
  }
};

const getBoard = async (id: string) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        columns: true,
      },
    });
    return board;
  } catch (error) {
    throw new Error(`Failed to get board ${id}`);
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
  const updatedBoard = await prisma.board.update({
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
    include: {
      columns: true,
    },
  });

  revalidatePath(`/board/${id}`);
  return updatedBoard;
};

export { createBoard, updateBoard, updateColor, getBoard , getBoards};
