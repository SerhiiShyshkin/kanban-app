'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type BoardLinkProps = {
  href: string;
  title?: string;
  icon?: ReactNode;
  id?: string;
};

const BoardLink = ({ href, title, icon }: BoardLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className="text-heading-md flex items-center gap-4 rounded-r-[100px] py-4 pl-8 font-bold *:fill-textMuted *:text-textMuted has-[:checked]:bg-primaryPurple"
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

export default BoardLink;
