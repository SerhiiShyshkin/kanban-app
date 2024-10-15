import Link from "next/link";
import prisma from "@/lib/db";
import AddBoardModal from "../components/Modal";
import { AddBoardForm } from '../features/AddBoardForm';



export default async function Sidebar() {

    const boards = await prisma.board.findMany()
    //console.log('active item: ' + boards[0].id)

    return (
        <>
            <div>
                {boards.map(({ title, id }) => (<div key={id}><Link href={`/board/${id}`}>{title}</Link></div>))}
            </div>
            <AddBoardModal title="+ Create New Board">
                <AddBoardForm></AddBoardForm>
            </AddBoardModal>
        </>
    );
}