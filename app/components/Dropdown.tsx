'use client';

import { ReactNode } from 'react';

type DropdownProps = {
  children: ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
  return (
    <div className=" text-textMuted text-caption flex flex-col items-start gap-2 w-52 mt-2 bg-white rounded-lg shadow-dropdown p-4">
      {children}
    </div>
  );
};

export default Dropdown;
