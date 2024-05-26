import { BiSolidUpArrow } from "react-icons/bi";
// import { BiSolidDownArrow } from "react-icons/bi";

function SidebarItem() {
  return (
    <div className=" flex items-center justify-around border-b-2 border-gray-200/30 p-3  lg:justify-between">
      <div className="space-y-1.5">
        <p className="font-bold">Name</p>
        <p className="text-xs opacity-50">
          Mkt.Cap: <span>$197,487</span>
        </p>
      </div>
      <div className="text-red-500">
        <p className="flex items-center gap-1">
          <BiSolidUpArrow />
          <span>2.12%</span>
        </p>
      </div>
    </div>
  );
}

export default SidebarItem;
