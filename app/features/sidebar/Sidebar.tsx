import prisma from "@/lib/db";
import AddBoard from "../AddBoard";
import { BoardList } from "./components/BoardList";

export default function Sidebar() {
  return (
    <div className="max-w-[300px] ">
      <div className="">
        <BoardList />
      </div>
      <AddBoard />
    </div>
  );
}
