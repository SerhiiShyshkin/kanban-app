"use client";

import { createBoard } from "@/lib/actions/board-actions";
import { useState } from "react";
import { z } from "zod";

//const schemaColumn = z.object({ title: z.string().min(1) });
const schemaTitle = z.object({ title: z.string().min(1) });

//type Column = z.infer<typeof schemaTitle>;
type Title = z.infer<typeof schemaTitle>;

export default function AddBoardForm({ action }: { action?: () => void }) {
  const [columns, setcolumns] = useState<Title[]>([]);
  const [title, setTitle] = useState<Title>({ title: "" });

  const parsecolumns = schemaTitle.array().safeParse(columns);
  const parseTitle = schemaTitle.safeParse(title);

  const handleColumnChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const columnValues: { title: string }[] = [...columns];
    columnValues[index].title = e.target.value;
    setcolumns(columnValues);
  };

  const handleRemovecolumns = (index: number) => {
    const newcolumns = [...columns];
    newcolumns.splice(index, 1);
    setcolumns(newcolumns);
  };

  const handleSubmit = () => {
    createBoard({ title: title.title, columns });
    action && action();
  };

  return (
    <form action={handleSubmit} className="">
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="title"
          value={title.title}
          onChange={(e) => setTitle({ title: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {columns.length > 0 && (
        <>
          <h2>columns</h2>
          {columns.map((column, index) => (
            <div className="flex justify-between" key={index}>
              <input
                name="column"
                type="text"
                onChange={(e) => handleColumnChange(index, e)}
                value={column.title}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
              <button onClick={() => handleRemovecolumns(index)}>X</button>
            </div>
          ))}
        </>
      )}

      <div>
        <button type="button" onClick={() => setcolumns([...columns, { title: "" }])} disabled={!parsecolumns.success}>
          + Add New Column
        </button>
      </div>
      <div>
        <button type="submit" disabled={!parseTitle.success || !parsecolumns.success}>
          Create New Board
        </button>
      </div>
    </form>
  );
}
