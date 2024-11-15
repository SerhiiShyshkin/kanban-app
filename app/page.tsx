import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";
import { getBoard, getBoards } from "@/lib/server-actions/board-actions";

export default async function Home() {
  const [first] = await getBoards();
  console.log(first);
  first && redirect(`board/${first.id}`);

  return <></>;
}
