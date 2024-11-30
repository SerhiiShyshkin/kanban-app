"use client";


import Modal from "@/app/components/Modal";
import {Column, Task} from "@/app/types";
import useToggleOpen from "@/lib/hooks/useToggleOpen";
import TaskForm from "./components/TaskForm";

//const schemaTitle: ZodString = z.string(z.string().min(1));

type UpdateTaskProps = {
    columns?: Column[];
    task: Task | null;

};


export default function UpdateTask({task, columns = []}: UpdateTaskProps) {
    const {isOpen, setIsOpen} = useToggleOpen();

    return (
        <>
            <button type="button" className="btn-primary-L"
                    onClick={() => setIsOpen(true)} /* disabled={columns?.length === 0} */>
                + Add New Task
            </button>
            {isOpen && columns.length > 0 && (
                <Modal setIsOpen={setIsOpen}>
                    <TaskForm task={task} columns={columns ? columns : []} setIsOpen={setIsOpen}/>
                </Modal>
            )}
        </>
    );
}
