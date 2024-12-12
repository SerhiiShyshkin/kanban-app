'use client';

import BoardItem from '@/app/features/board/components/BoardItem';
import BoardIcon from './BoardIcon';
import { Board } from '@/app/types';

type BoardListProps = {
  title: string;
  boards: Board[];
};

const BoardList = ({ title, boards = [] }: BoardListProps) => {
  return (
    <div className="row-start-1 row-end-2 flex max-h-board-list flex-col gap-5 pr-6">
      <div className="text-body-small pl-8 tracking-wide-2.4 text-textMuted">
        {`${title} (${boards.length})`.toUpperCase()}
      </div>
      <div className="scrollbar overflow-y-auto pr-6">
        {boards.map(({ id, title }) => (
          <BoardItem
            href={`/board/${id}`}
            key={id}
            title={title}
            icon={<BoardIcon />}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
