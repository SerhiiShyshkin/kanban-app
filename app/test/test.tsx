'use client'

import { createTask } from "@/lib/actions/task-actions";

export function Test() {
    const title = 'Task 1'
    const description = 'Task 1 description'
    const columnId = 'c8e5e64d-ce58-4161-874f-54687c4ee4db'
    const order = 1

    const handleSubmit = () => {
        createTask({title, description, columnId, order})
    }





    return (
        <>
            <button  onClick={() => handleSubmit()}>Add Task</button>
        </>
    );
}