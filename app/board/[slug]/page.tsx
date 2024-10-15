import prisma from "@/lib/db";

export default async function Board({ params }: { params: { slug: string } }) {

    const columns = await prisma.column.findMany({

        where: {
            boardId: params.slug,

        },
        include: {
            tasks: true
        }




    })

    return (
        <>

            {columns.map(({id, title, order, tasks }) => (<span key={id}>{title + order + id}</span>))}

        </>
    );
}