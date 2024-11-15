import { Subtask, Task } from "@prisma/client";
import ColorMarkerWithPicker from "../../../components/ColorMarkerWithPicker";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


type BoardColumnProps = {
  title: string;
  color: string;
  id: string;
  tasks: (Task & {
    subtasks: Subtask[];
  })[];
};

const BoardColumn = ({ title, id, color,tasks }: BoardColumnProps) => {


  

  
  
/*   function getRandomColor(): string {
    const hexChars = "0123456789ABCDEF";
    const hexArray = hexChars.split("");
    const colorArray = Array.from({ length: 6 }, () => hexArray[Math.floor(Math.random() * hexArray.length)]);
    const color = `#${colorArray.join("")}`;
    return color;
  }
 */
  return (
    <div className="flex flex-col gap-6 w-[280px]">
      <div className="flex flex-row gap-3 items-center">
        <ColorMarkerWithPicker color={color}  id={id} />
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
            <div className="text-xs text-textMuted font-bold leading-15 tracking-normal">{`${
              task.subtasks.length as number
            } subtasks`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
