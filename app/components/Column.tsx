import { Subtask, Task } from "@prisma/client";
import ColorPicker from "./ColorPicker";

/* type ColumnProps = {
  title: string;
  tasks: {
    id: string;
    title: string;
    description: string | null;
    columnId: string;
    subtusks: {
      id: string;
      title: string;
      isCompleted: boolean;
      taskId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }[];
}; */

type AppTask = Task & {
  subtasks: Subtask[];
};

type ColumnProps = {
  title: string;
  tasks: AppTask[];
};

const BoardColumn = ({ title, tasks }: ColumnProps) => {
  function getRandomColor(): string {
    const hexChars = "0123456789ABCDEF";
    const hexArray = hexChars.split("");
    const colorArray = Array.from({ length: 6 }, () => hexArray[Math.floor(Math.random() * hexArray.length)]);
    const color = `#${colorArray.join("")}`;
    return color;
  }

  return (
    <div className="flex flex-col gap-6 w-[280px]">
      <div className="flex flex-row gap-3 items-center">
        <ColorPicker defaultColor={getRandomColor()} />
        <div className="text-xs text-textMuted font-bold leading-15 tracking-[2.4px]">{`${title.toUpperCase()} (${
          tasks.length
        })`}</div>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-2 text-sm text-black font-bold leading-19 tracking-normal bg-white px-4 py-6 rounded-lg"
          >
            {task.title}
            <div className="text-xs text-textMuted font-bold leading-15 tracking-normal">{`${task.subtasks.length} subtasks`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
