import { HiMagnifyingGlass } from "react-icons/hi2";

function Searchbar() {
  return (
    <div className="flex w-full items-center rounded-md bg-white px-4 shadow-sm outline-blue-400 focus:outline">
      <HiMagnifyingGlass />
      <input
        type="text"
        placeholder="Search by coin"
        className="w-full px-4 py-2 outline-none"
      />
    </div>
  );
}

export default Searchbar;
