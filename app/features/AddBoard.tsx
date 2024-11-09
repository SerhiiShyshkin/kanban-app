"use client";

import { useState } from "react";
import { z } from "zod";
import { createBoard } from "@/lib/actions/board-actions";
import Modal from "../components/Modal";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Form from "../components/Form";
import BoardIcon from "../components/icons/BoardIcon";
import CloseIcon from "../components/icons/CloseIcon";

const schemaTitle = z.object({ title: z.string().min(1) });

type Title = z.infer<typeof schemaTitle>;

export default function AddBoard() {
  const [columns, setcolumns] = useState<Title[]>([]);
  const [title, setTitle] = useState<Title>({ title: "" });
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBoard({ title: title.title, columns });
    setIsOpen(false);
  };

  return (
    <>
      <Button className="btn-transparent" type="button" action={() => setIsOpen(true)}>
        <div className="flex items-center gap-2">
          <BoardIcon className="fill-primaryPurple" />
          <>+ Create New Board</>
        </div>
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
                htmlFor="title"
                name="Name"
              />
              <Input
                label="title"
                value={title.title}
                onChange={(e) => setTitle({ title: e.target.value })}
                placeholder="e.g. Web Design"
              />
            </div>
            <div className="flex flex-col gap-2">
              {columns.length > 0 && (
                <Label
                  className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
                  htmlFor="column"
                  name="Columns"
                />
              )}
              <div className="flex flex-col gap-3">
                {columns.map((column, index) => (
                  <div className="flex justify-between gap-4" key={index}>
                    <Input
                      name="column"
                      label="column"
                      value={column.title}
                      onChange={(e) => handleColumnChange(index, e)}
                    />
                    <Button className="btn-icon" type="button" action={() => handleRemovecolumns(index)}>
                      <CloseIcon className="fill-textMuted hover:fill-errorRed" />
                    </Button>
                  </div>
                ))}
                <Button
                  className="btn-secondary"
                  type="button"
                  action={() => setcolumns([...columns, { title: "" }])}
                  disabled={!parsecolumns.success}
                >
                  Add New Column
                </Button>
              </div>
            </div>
            <Button type="submit" className="btn-primary-S" disabled={!parseTitle.success || !parsecolumns.success}>
              Add New Board
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
