"use client";

import { useState } from "react";
import { z } from "zod";
import { createBoard, updateBoard } from "@/lib/server-actions/board-actions";
import { getRandomColor } from "@/lib/helpers/getRandomColor";
import { Prisma } from "@prisma/client";
import { Label } from "@/app/components/Label";
import Form from "@/app/components/Form";
import { Input } from "@/app/components/Input";
import CloseIcon from "@/app/components/icons/CloseIcon";
import { Board, Column } from "@/app/types";

const schemaTitle = z.string(z.string().min(1));
const schemaColumn = z.object({ title: z.string().min(1) });

type Title = z.infer<typeof schemaTitle>;

type BoardFormProps = {
  board: Board | null;
  setIsOpen: (isOpen: boolean) => void;
};

const BoardForm = ({ board, setIsOpen }: BoardFormProps) => {
  const [title, setTitle] = useState<Title>(board ? board.title : "");
  const [columns, setColumns] = useState<Column[]>(board ? board.columns : []);

  const parseColumns = schemaColumn.array().safeParse(columns);
  const parseTitle = schemaTitle.safeParse(title);

  const handleColumnChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const columnValues: Column[] = [...(columns || [])];
    columnValues[index].title = e.target.value;
    columnValues[index].color = getRandomColor();
    setColumns(columnValues);
  };

  const handleRemoveColumn = (index: number) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
  };

  const addEmptyColumn = () => {
    setColumns([...columns, { title: "" } as Column]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (board) {
      const updatedData = await updateBoard(board.id, title, columns);
      setTitle(updatedData.title);
      setColumns(updatedData.columns);
      setIsOpen(false);
    } else {
      const newBoard = await createBoard(title, columns);
      setColumns([]);
      setTitle("");
      setIsOpen(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label
            className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
            htmlFor="title"
            name={`${board ? "Board Name" : "Name"}`}
          />
          <Input label="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Web Design" />
        </div>
        <div className="flex flex-col gap-2">
          {columns.length > 0 && (
            <Label
              className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
              htmlFor="column"
              name={`${board ? "Board Columns" : "Columns"}`}
            />
          )}
          <div className="flex flex-col gap-3">
            {columns.map((column, index) => (
              <div className="flex justify-between gap-4" key={index}>
                <Input
                  name="column"
                  label="column"
                  value={column?.title}
                  onChange={(e) => handleColumnChange(index, e)}
                />
                <button type="button" className="btn-icon" onClick={() => handleRemoveColumn(index)}>
                  <CloseIcon className="fill-textMuted hover:fill-errorRed" />
                </button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addEmptyColumn} disabled={!parseColumns.success}>
              Add New Column
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary-S" disabled={!parseTitle.success || !parseColumns.success}>
          {`${board ? "Save Changes" : "Create New Board"}`}
        </button>
      </div>
    </Form>
  );
};

export default BoardForm;
