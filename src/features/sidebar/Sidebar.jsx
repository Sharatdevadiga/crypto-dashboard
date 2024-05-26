import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { fetchData } from "./sidebarSlice";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

function Sidebar() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.sidebar);

  // load data on component mount
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-4 space-y-2 overflow-y-scroll bg-white scrollbar scrollbar-thumb-blue-50 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full scrollbar-h-4 min-w-64">
      <p className="my-4 text-xl font-bold text-center">
        Cryptocurrency by m.cap
      </p>
      <div>
        {isLoading && <Loader />}
        {error && <Error message="Loading failed" />}
        {data.length &&
          data.map((coin) => <SidebarItem key={coin.id} coin={coin} />)}
      </div>
    </div>
  );
}

export default Sidebar;
