"use client";

import { handleSubmit } from "@/lib/actions/board-actions";
import prisma from "@/lib/db";
import { useState } from "react";

export default function AddBoardForm() {
  const [columns, setColumns] = useState<{ name: string }[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleColumnChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const columnValues: { name: string }[] = [...columns];
    columnValues[index].name = e.target.value;
    

    setColumns(columnValues);
  };

  const handleRemoveColumns = (index: number) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const val = (array: { name: string }[]) => {
    array.map(({ name }) => {
      if(name.length === 0) {
        setDisabled(true);
        console.log(disabled)
         return ;
      }
    })
    return 

  };

  

  

  return (
    <form
    action={handleSubmit}
    
    >
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {columns.length > 0 && (
        <>
          <h2>Columns</h2>
          {columns.map((column, index) => (
            <div className="flex justify-between" key={index}>
              <input
                name="column"
                type="text"
                onChange={(e) => handleColumnChange(index, e)}
                value={column.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              ></input>
              <button onClick={() => handleRemoveColumns(index)}>X</button>
            </div>
          ))}
        </>
      )}

      <div>
        <button type="button" onClick={() => setColumns([...columns, { name: "" }])} disabled={disabled}>
          + Add New Column
        </button>
      </div>
      <div>
        <button type="submit">Create New Board</button>
      </div>
    </form>
  );
}
