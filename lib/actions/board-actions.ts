"use server";

import prisma from "../db";

export async function handleSubmit(data: FormData) {
  const title = data.get("title");
  const names = data.getAll("column");

  const columns: {title: string, order: number}[] = [];

  names.map((name, index) => columns.push({title: name as string, order: index }) )

  await prisma.board.create({
    data: {
        title: title as string,
        columns: {
          create: columns
        }

    }
  })
}
