'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type BoardItemProps = {
  href: string;
  title?: string;
  icon?: ReactNode;
  id?: string;
};

const BoardItem = ({ href, title, icon }: BoardItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className="flex text-heading-md gap-4 font-bold items-center rounded-r-[100px] py-4 pl-8 *:text-textMuted *:fill-textMuted has-[:checked]:bg-primaryPurple"
    >
      <input
        className="peer hidden"
        id="link"
        name="link"
        type="radio"
        readOnly
        checked={href === pathname}
      />
      <div className="peer-checked:fill-white"> {icon}</div>
      <div className="peer-checked:text-white">{title}</div>
    </Link>
  );
};

export default BoardItem;
