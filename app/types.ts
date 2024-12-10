import { Prisma } from '@prisma/client';

type Board = Prisma.BoardGetPayload<{
  select: {
    id: true;
    title: true;
    columns: { select: { id: true; title: true; color: true } };
  };
}>;

type Column = Prisma.ColumnGetPayload<{
  select: { id: true; title: true; color: true };
}>;

type Task = Prisma.TaskGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    subtasks: { select: { id: true; title: true; isCompleted: true } };
  };
}>;

type Subtask = Prisma.SubtaskGetPayload<{
  select: { id: true; title: true; isCompleted: true };
}>;

export type { Board, Column, Task, Subtask };
