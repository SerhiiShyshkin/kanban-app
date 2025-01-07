'use client';

import { ReactNode } from 'react';

type ItemProps = {
  children: ReactNode;
  isActive?: boolean;
  setActive?: () => void;
};

const InteractiveItem = ({ children, isActive, setActive }: ItemProps) => {
  return (
    <div
      className={`text-heading-md flex items-center gap-4 py-4 pl-8 ${isActive ? 'bg-primaryPurple text-white fill-white rounded-r-full' : 'text-textMuted fill-textMuted'}`}
      onClick={setActive}
    >
      {children}
    </div>
  );
};

export default InteractiveItem;
