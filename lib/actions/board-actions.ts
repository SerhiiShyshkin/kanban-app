"use server";

import { redirect } from "next/dist/server/api-utils";
import prisma from "../db";
import { revalidatePath } from "next/cache";

export async function createBoard({ title, columns }: { title: string; columns: { title: string }[] }) {
  const columns1: { title: string; }[] = [];

  columns.map((column) => columns1.push({ title: column.title, }));

  await prisma.board.create({
    data: {
      title: title,
      columns: {
        create: columns1,
      },
    },
  });

  revalidatePath("/");
  
}
