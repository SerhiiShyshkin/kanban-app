"use server";

import prisma from "../db";
import { revalidatePath } from "next/cache";

export async function createTask({
  title,
  description,
  columnId,
  order,
}: {
  title: string;
  description: string;
  columnId: string;
  order: number;
}) {
  await prisma.task.create({
    data: {
      title,
      description,
      column: {
        connect: {
          id: columnId,
        },
      },
      order,
    },
  });

  revalidatePath("/");
}
