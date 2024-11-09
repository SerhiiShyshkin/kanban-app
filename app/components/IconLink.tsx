"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const IconLink = ({ href, className, children }: IconLinkProps) => {
  const pathname = usePathname();

  return (
    <label htmlFor="link" className="cursor-pointer ">
      <Link href={href} className={className}>
        <input className="peer hidden" id="link" name="link" type="radio" readOnly checked={href === pathname} />
        {children}
      </Link>
    </label>
  );
};

export default IconLink;
