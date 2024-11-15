import BoardItem from "@/app/features/board/components/BoardItem";
import BoardIcon from "./BoardIcon";
import { getBoards } from "@/lib/server-actions/board-actions";

const BoardList = async () => {
  const boards = await getBoards();
  return (
    <div className="row-start-1 row-end-2 max-h-[55vh] overflow-y-auto scrollbar pr-6">
      <div className="text-s text-textMuted leading-15 tracking-[2.4px] font-bold pl-8 pb-[19px]">{`ALL BOARDS (${boards.length})`}</div>
      {boards.map((board, index) => (
        <BoardItem href={`/board/${board.id}`} key={index} title={board.title} icon={<BoardIcon />} />
      ))}
    </div>
  );
};

export default BoardList;
