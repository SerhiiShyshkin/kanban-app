"use client";
import { BoardIcon } from "@/app/components/icons/BoardIcon";
import prisma from "@/lib/db";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type BoardLinkProps = {
  href: string;
  first: string;

  children: ReactNode;
};

export const BoardLink = ({ href, first, children }: BoardLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    pathname === "/" && router.push(`/board/${first}`);
  }, []);

  return (
    <Link
      href={href}
      className={`${
        href === pathname ? " text-white bg-primaryPurple rounded-r-[100px] " : " text-textMuted "
      } text-sm  font-bold leading-19 tracking-normal flex gap-4 items-center p-4 pl-8`}
    >
      <BoardIcon color={`${href === pathname ? "#FFFFFF" : "#828FA3"}`} />
      {children}
    </Link>
  );
};
