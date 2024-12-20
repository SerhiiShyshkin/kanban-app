import {Task} from "@/app/types";
import ColorMarkerWithPicker from "../../../components/ColorMarkerWithPicker";

type BoardColumnProps = {
    title: string;
    color: string;
    id: string;
    tasks: Task[];
};

const BoardColumn = ({title, id, color, tasks}: BoardColumnProps) => {


    return (
        <div className="flex flex-col gap-6 w-[280px]">
            <div className="flex flex-row gap-3 items-center">
                <ColorMarkerWithPicker color={color} id={id}/>
                <div
                    className="text-xs text-textMuted font-bold leading-15 tracking-[2.4px]">{`${title.toUpperCase()} (${
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
