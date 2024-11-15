import BoardList from "./features/board/components/BoardList";
import UpdateBoard from "./features/board/UpdateBoard";

export default async function Sidebar() {
  

  return (
    <div className="grid grid-rows-[minmax(0,_max-content)_max-content_1fr] max-w-[300px] bg-white max-h-screen min-h-full">
      <BoardList/>
      <div className="row-start-2 row-end-3">
        <UpdateBoard board={null} />
      </div>
      <div className=" bg-white row-start-3 -row-end-1 col-start-1 col-end-2 p-8 self-end">Theme</div>
    </div>
  );
}
