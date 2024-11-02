
import { Board } from "@prisma/client";
import { BoardIcon } from "@/app/components/icons/BoardIcon";
import prisma from "@/lib/db";
import { BoardLink } from "./BoardLink.";
import Link from "next/link";
import { redirect, RedirectType, usePathname } from "next/navigation";

export async function BoardList() {
  const boards = await prisma.board.findMany();
  const [first] = boards;


  

  return (
    <div className="">
      {boards.map(({ id, title }) => (
        <BoardLink first={first.id} href={`/board/${id}`} key={id}>
          {title}
        </BoardLink>
      ))}
    </div>
  );
}
