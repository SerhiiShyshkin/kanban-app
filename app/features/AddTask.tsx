"use client";

import { useState } from "react";
import { z } from "zod";
import Modal from "../components/Modal";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Form from "../components/Form";
import CloseIcon from "../components/icons/CloseIcon";
import { createTask } from "@/lib/actions/task-actions";
import { Column } from "@prisma/client";
import Select from "../components/Select";

const schemaTitle = z.object({ title: z.string().min(1) });

type AddTaskProps = {
  columns: Column[];
};

type Title = z.infer<typeof schemaTitle>;
export default function AddTask({ columns }: AddTaskProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<Title[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //const [selectedValue, setSelectedValue] = useState<string>("");
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
      <Button type="button" className="btn-primary-L" action={() => setIsOpen(true)}>
        + Add New Task
      </Button>

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
                    <Button className="btn-icon" type="button" action={() => handleRemoveSubtask(index)}>
                      <CloseIcon className="fill-textMuted hover:fill-errorRed" />
                    </Button>
                  </div>
                ))}
                <Button
                  className="btn-secondary"
                  type="button"
                  action={() => setSubtasks([...subtasks, { title: "" }])}
                  disabled={!parsecolumns.success}
                >
                  Add New Subtask
                </Button>
              </div>
            </div>

            <div>
              {/* <label htmlFor="dropdown">Status</label>
              <select id="dropdown" name="dropdown" value={selectedValue} onChange={handleSelectedChange}>
                <option value="Please ..."></option>
                {columns?.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select> */}
              <Select
                options={columns}
                getOptionalValue={(column) => column.title}
                getOptionalLabel={(column) => column.title}
                getOptionalId={(column) => column.id}
                state={selectedOption}
                onChange={(column) => setSelectedOption(column)}
              />
            </div>

            <Button type="submit" className="btn-primary-S" disabled={false}>
              Create Task
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
