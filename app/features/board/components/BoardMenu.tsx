'use client';

import List from '@/app/components/List';
import { Board } from '@/app/types';
import InteractiveItem from '@/app/components/InteractiveItem';
import Link from 'next/link';
import { useState } from 'react';
import BoardIcon from '@/app/features/board/components/BoardIcon';

type BoardMenuProps = {
  boards: Board[];
};

const BoardMenu = ({ boards }: BoardMenuProps) => {
  const [first] = boards;
  const [activeId, setActiveId] = useState<string>(first.id);
  return (
    <List
      data={boards}
      renderItem={({ id, title }) => (
        <Link href={`/board/${id}`}>
          <InteractiveItem
            isActive={activeId === id}
            setActive={() => setActiveId(id)}
          >
            <BoardIcon />
            {title}
          </InteractiveItem>
        </Link>
      )}
    />
  );
};

export { BoardMenu };
