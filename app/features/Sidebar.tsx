import prisma from "@/lib/db";
import AddBoard from "./AddBoard";
import IconLink from "@/app/components/IconLink";
import BoardIcon from "../components/icons/BoardIcon";


export default async function Sidebar() {
  const boards = await prisma.board.findMany();
  const [first] = boards;

  return (
    <div className="grid grid-rows-[minmax(0,_max-content)_max-content_1fr] max-w-[300px] bg-white max-h-screen min-h-full">
      <div className="row-start-1 row-end-2 max-h-[55vh] overflow-y-auto scrollbar pr-6">
        {boards.map(({ id, title }) => (
          <IconLink
            className="flex gap-4 font-bold items-center rounded-r-[100px] py-4 pl-8 *:text-textMuted *:fill-textMuted has-[:checked]:bg-primaryPurple"
            href={`/board/${id}`}
            key={id}
          >
            <BoardIcon className="peer-checked:fill-white" />
            <div className="peer-checked:text-white">{title}</div>
          </IconLink>
        ))}
      </div>
      <div className="row-start-2 row-end-3">
        <AddBoard />
      </div>
      <div className=" bg-white row-start-3 -row-end-1 col-start-1 col-end-2 p-8 self-end">Theme</div>
    </div>
  );
}
