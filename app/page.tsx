import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const [first] = await prisma.board.findMany();
  first && redirect(`board/${first.id}`);

  return <></>;
}
