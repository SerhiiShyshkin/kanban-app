import BoardList from './features/board/components/BoardList';
import AddBoard from '@/app/features/board/components/AddBoard';
import { getBoards } from '@/lib/server-actions/board-actions';

export default async function Sidebar() {
  const boards = await getBoards();

  //console.log(boards[0]);

  return (
    <div className="grid grid-rows-[minmax(0,_max-content)_max-content_1fr] max-w-[300px] bg-white max-h-screen min-h-full">
      <BoardList boards={boards} />
      <div className="row-start-2 row-end-3">
        <AddBoard />
      </div>
      <div className=" bg-white row-start-3 -row-end-1 col-start-1 col-end-2 p-8 self-end">
        Theme
      </div>
    </div>
  );
}
