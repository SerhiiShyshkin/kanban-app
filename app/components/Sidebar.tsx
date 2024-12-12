'use client';

import React from 'react';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="grid max-h-screen min-h-full max-w-sidebar grid-rows-[minmax(0,_max-content)_max-content_1fr] bg-white">
      <div className="row-start-2 row-end-3">{children}</div>
      <div className="col-start-1 col-end-2 row-start-3 -row-end-1 self-end p-8">
        Theme
      </div>
    </div>
  );
};

export default Sidebar;
