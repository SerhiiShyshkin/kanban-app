"use client";

import { useState } from "react";
import { z } from "zod";

import { createTask } from "@/lib/server-actions/task-actions";


import Modal from "@/app/components/Modal";
import Form from "@/app/components/Form";
import { Label } from "@/app/components/Label";
import { Input } from "@/app/components/Input";
import CloseIcon from "@/app/components/icons/CloseIcon";
import Select from "@/app/components/Select";
import { Column } from "@prisma/client";


const schemaTitle = z.object({ title: z.string().min(1) });

type TaskProps = {
  columns: Column [];
};

type Title = z.infer<typeof schemaTitle>;
export default function Task({ columns }: TaskProps) {
  //const [first] = columns && columns;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<Title[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Column>(columns[0]);

  const parsecolumns = schemaTitle.array().safeParse(subtasks);
  const parseTitle = schemaTitle.safeParse(title);

  const handleSubtasksChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const subtaskValues: { title: string }[] = [...subtasks];
    subtaskValues[index].title = e.target.value;
    setSubtasks(subtaskValues);
  };

  const handleRemoveSubtask = (index: number) => {
    const newcolumns = [...subtasks];
    newcolumns.splice(index, 1);
    setSubtasks(newcolumns);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({ title: title, description: description, columnId: selectedOption.id, subtasks: subtasks });
    setIsOpen(false);
  };

  return (
    <>
      <button type="button" className="btn-primary-L" onClick={() => setIsOpen(true)}>
        + Add New Task
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
                htmlFor="title"
                name="Title"
              />
              <Input
                label="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
                htmlFor="description"
                name="Description"
              />
              <Input
                type="textarea"
                label="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                               recharge the batteries a little."
              />
            </div>
            <div className="flex flex-col gap-2">
              {subtasks.length > 0 && (
                <Label
                  className="block text-textMuted text-xs font-bold leading-15 tracking-normal"
                  htmlFor="column"
                  name="Subtasks"
                />
              )}
              <div className="flex flex-col gap-3">
                {subtasks.map((subtask, index) => (
                  <div className="flex justify-between gap-4" key={index}>
                    <Input
                      name="column"
                      label="column"
                      value={subtask.title}
                      onChange={(e) => handleSubtasksChange(index, e)}
                    />
                    <button className="btn-icon" onClick={() => handleRemoveSubtask(index)}>
                      <CloseIcon className="fill-textMuted hover:fill-errorRed" />
                    </button>
                  </div>
                ))}
                <button
                  className="btn-secondary"
                  onClick={() => setSubtasks([...subtasks, { title: "" }])}
                  disabled={!parsecolumns.success}
                >
                  Add New Subtask
                </button>
              </div>
            </div>

            <div>
              <Select
                options={columns}
                getOptionalValue={(column) => column.title}
                selectedOption={selectedOption}
                onChange={(column) => setSelectedOption(column)}
              />
            </div>

            <button className="btn-primary-S" disabled={false}>
              Create Task
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
