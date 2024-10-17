import Link from "next/link";
import prisma from "@/lib/db";
import AddBoardModal from "../components/Modal";
import AddBoardForm from "../features/AddBoardForm";

export default async function Sidebar() {
//const boards = await prisma.board.findMany();
  //console.log('active item: ' + boards[0].id)

  /* const getBoards = await prisma.board.findUnique({
    where: {
      id: "0fc1432f-f656-4486-9b59-b5ca027a1c3e",
    },
    include: {
      columns: true,
    },
  }); */

  /* await prisma.board.create({
    data: {
      title: "test3",
      order: 78,
      columns: {
        create: [{ title: "tc1", order: 456 }],
      },
    },
  }); */

  /* if (getBoards !== null) console.log(getBoards.columns); */
  

  return (
    <>
      <div>
        {/* {boards.map(({ title, id }) => (
          <div key={id}>
            <Link href={`/board/${id}`}>{title}</Link>
          </div>
        ))} */}
      </div>
      <AddBoardModal title="+ Create New Board">
        <AddBoardForm></AddBoardForm>
      </AddBoardModal>
    </>
  );
}
