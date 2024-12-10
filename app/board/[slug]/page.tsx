import BoardColumn from '@/app/features/board/components/BoardColumn';
import { getBoardById } from '@/lib/server-actions/board-actions';
import UpdateTask from '@/app/features/task/UpdateTask';
import { Column } from '@/app/types';
import BoardActions from '@/app/features/board/components/BoardActions';
import { redirect } from 'next/navigation';

export default async function Board({ params }: { params: { slug: string } }) {
  const board = await getBoardById(params.slug);
  if (!board) {
    redirect('/');
  }

  const columns: Column[] = board?.columns ?? [];

  return (
    <>
      <div
        id="modal-root"
        className="flex w-full gap-6 items-center bg-white text-black text-xl leading-30 tracking-normal font-bold header p-6 "
      >
        <div className="flex-1">{board?.title}</div>
        <div className="flex-none">
          <UpdateTask task={null} columns={columns} />
        </div>
        <div className="flex-none">
          <BoardActions board={board} />
        </div>
      </div>
      <div className="flex flex-row px-6 py-6 gap-6">
        {board?.columns.map(({ id, title, color, tasks }) => (
          <BoardColumn
            key={id}
            title={title}
            id={id}
            color={color}
            tasks={tasks}
          />
        ))}
      </div>
    </>
  );
}
