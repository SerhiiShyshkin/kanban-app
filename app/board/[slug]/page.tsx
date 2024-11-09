import { Button } from "@/app/components/Button";
import Column from "@/app/components/Column";
import AddTask from "@/app/features/AddTask";
import prisma from "@/lib/db";

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

  return (
    <>
      <div className="flex items-center bg-white text-black text-xl leading-30 tracking-normal font-bold header p-6 justify-between ">
        {board?.title}
        <AddTask columns={board?.columns} />
      </div>
      <div className="flex flex-row px-6 py-6 gap-6">
        {board?.columns.map(({ id, title, tasks }) => (
          <Column key={id} title={title} tasks={tasks} />
        ))}
      </div>
    </>
  );
}
