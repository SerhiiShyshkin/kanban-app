"use client";

import { useState } from "react";



export default function AddBoardForm() {
  const [columns, setColumns] = useState<{name: string}[]>([])

  const handleColumnChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const columnValues: {name: string}[] = [...columns];
    columnValues[index].name = e.target.value;
    setColumns(columnValues);    
  }

  const handleRemoveColumns = (index: number) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  }
  

  return (
    <form>
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {columns.length > 0 && (
        <>
          <h2>Columns</h2>
          {columns.map((column, index) => (
            <div className="flex justify-between" key={index}>
              <input
              type="text"
                onChange={(e) => handleColumnChange(index, e)}
                value={column.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></input>
              <button type="button" onClick={() => handleRemoveColumns(index)} >X</button>
            </div>
          ))}
          
        </>
      )}
      
      <div>
        <button type="button" onClick={() => setColumns([...columns, {name: ''}])}>+ Add New Column</button>
      </div>
      <div>
        <button>Create New Board</button>
      </div>
    </form>
  );
}
