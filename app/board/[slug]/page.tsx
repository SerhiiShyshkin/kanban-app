import BoardColumn from "@/app/features/board/components/BoardColumn";
import Sidebar from "@/app/Sidebar";
import Task from "@/app/features/task/UpdateTask";

import prisma from "@/lib/db";

import { get } from "http";
import { getBoardById } from "@/lib/server-actions/board-actions";
import UpdateTask from "@/app/features/task/UpdateTask";
import { Column } from "@/app/types";
import DeleteBoard from "@/app/features/board/DeleteBoard";

export default async function Board({ params }: { params: { slug: string } }) {
  const board = await getBoardById(params.slug);
  const columns: Column[] = board?.columns ?? [];

  return (
    <>
      <div className="flex items-center bg-white text-black text-xl leading-30 tracking-normal font-bold header p-6 justify-between ">
        {board?.title}
        <UpdateTask task={null} columns={columns} />
        <DeleteBoard id={params.slug} />
      </div>
      <div className="flex flex-row px-6 py-6 gap-6">
        {board?.columns.map(({ id, title, color, tasks }) => (
          <BoardColumn key={id} title={title} id={id} color={color} tasks={tasks} />
        ))}
      </div>
    </>
  );
}
