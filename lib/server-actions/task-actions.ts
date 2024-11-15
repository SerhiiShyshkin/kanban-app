"use server";

import prisma from "../db";
import { revalidatePath } from "next/cache";

export async function createTask({
  title,
  description,
  columnId,
  subtasks,
}: {
  title: string;
  description: string;
  columnId: string;
  subtasks: { title: string }[];
}) {
  const subtasks1: { title: string }[] = [];

  subtasks.map((subtask, index) => subtasks1.push({ title: subtask.title }));
  await prisma.task.create({
    data: {
      title,
      description,
      column: {
        connect: {
          id: columnId,
        },
      },
      subtasks: {
        create: subtasks1,
      },
    },
  });

  revalidatePath(`/board/${columnId}`);
}


