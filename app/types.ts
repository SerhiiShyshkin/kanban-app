import { Prisma } from "@prisma/client";

type Board = Prisma.BoardGetPayload<{
  select: { id: true; title: true; columns: { select: { title: true; color: true } } };
}>;

type Column = Prisma.ColumnGetPayload<{ select: { title: true; color: true } }>;

export type {Board, Column };
