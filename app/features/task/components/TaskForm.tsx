"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import {z} from "zod";
import {createTask} from "@/lib/server-actions/task-actions";
import Form from "@/app/components/Form";
import {Label} from "@/app/components/Label";
import {Input} from "@/app/components/Input";
import CloseIcon from "@/app/components/icons/CloseIcon";
import Select from "@/app/components/Select";
import {Column, Subtask, Task} from "@/app/types";

const schemaTitle = z.string().min(1);
const schemaColumn = z.object({title: z.string().min(1)});

type UpdateTaskProps = {
    columns: Column[];
    task: Task | null;
    setIsOpen(isOpen: boolean): void;
};

type Title = z.infer<typeof schemaTitle>;

export default function TaskForm({task, columns, setIsOpen}: UpdateTaskProps) {
    const [firstColumn] = columns ?? [];
    const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
    const [title, setTitle] = useState<Title>(task ? task.title : "");
    const [description, setDescription] = useState<string>(task ? task.description : "");
    const [selectedOption, setSelectedOption] = useState<Column>(firstColumn);

    const parseColumns = schemaColumn.array().safeParse(subtasks);
    const parseTitle = schemaTitle.safeParse(title);

    const handleSubtasksChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const subtaskValues: { id: string; title: string; isCompleted: boolean }[] = [...(subtasks || [])];
        subtaskValues[index].title = e.target.value;
        subtaskValues[index].isCompleted = false;
        setSubtasks(subtaskValues);
    };

    const handleRemoveSubtask = (index: number) => {
        const newColumns = [...subtasks];
        newColumns.splice(index, 1);
        setSubtasks(newColumns);
    };

    const addEmptySubtask = () => {
        setSubtasks([...subtasks, {title: "", isCompleted: false} as Subtask]);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask({title: title, description: description, columnId: selectedOption.id, subtasks: subtasks});
        setIsOpen(false);
    };

    return (
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
                                <button type="button" className="btn-icon" onClick={() => handleRemoveSubtask(index)}>
                                    <CloseIcon className="fill-textMuted hover:fill-errorRed"/>
                                </button>
                            </div>
                        ))}
                        <button className="btn-secondary" onClick={() => addEmptySubtask()}
                                disabled={!parseColumns.success}>
                            Add New Subtask
                        </button>
                    </div>
                </div>

                <div>
                    <Select
                        options={columns}
                        getOptionalValue={(column) => column.title}
                        selectedOption={selectedOption.title}
                        onChange={(column) => setSelectedOption(column)}
                    />
                </div>

                <button type="submit" className="btn-primary-S" disabled={!parseTitle.success || !parseColumns.success}>
                    Create Task
                </button>
            </div>
        </Form>
    );
}
