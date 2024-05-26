import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className=" space-y-2 bg-white p-2">
      <p className="my-4 text-center text-xl font-bold">
        Cryptocurrency by market cap
      </p>
      <SidebarItem />
      <SidebarItem />
    </div>
  );
}

export default Sidebar;
