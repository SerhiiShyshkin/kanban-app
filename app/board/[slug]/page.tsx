import TaskColumn from "@/app/features/board/components/BoardColumn";
import Sidebar from "@/app/Sidebar";
import Task from "@/app/features/task/Task";

import prisma from "@/lib/db";
import { Column } from "@prisma/client";

export default async function Board({ params }: { params: { slug: string } }) {
  const board = await prisma.board.findUnique({
    where: {
      id: params.slug,
    },
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

  const columns = board?.columns;

  


  return (
    <>
      
      <div className="flex items-center bg-white text-black text-xl leading-30 tracking-normal font-bold header p-6 justify-between ">
        {board?.title}
        {/* <Task columns={board?.columns as Column[]} /> */}
      </div>
      <div className="flex flex-row px-6 py-6 gap-6">
        {board?.columns.map(({ id, title, color, tasks }) => (
          <TaskColumn key={id} title={title} id={id} color={color} tasks={tasks} />
        ))}
      </div>
    </>
  );
}
