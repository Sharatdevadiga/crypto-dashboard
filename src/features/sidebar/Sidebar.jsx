import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { fetchData } from "./sidebarSlice";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

function Sidebar() {
  const dispatch = useDispatch();
  const { cryptoData, status, error } = useSelector((state) => state.sidebar);
  const { baseCurrency } = useSelector((state) => state.coinDropdown);

  // load data on component mount
  useEffect(() => {
    dispatch(fetchData(baseCurrency));
  }, [baseCurrency]);

  return (
    <div className="relative flex flex-col items-center h-screen px-4 pt-0 pb-4 space-y-2 overflow-y-scroll bg-white scrollbar-thumb-rounded-full scrollbar-h-4 min-w-72 scrollbar-thin">
      <div className="sticky top-0 z-10 w-full px-2 py-2 my-4 text-xl font-bold text-center rounded-t-lg bg-blue-50/50 backdrop-blur backdrop-filter">
        <p>Cryptocurrency by m.cap</p>
      </div>

      <div>
        {status === "loading" && <Loader />}
        {error && <Error message="Loading failed" />}
        {cryptoData.length &&
          status === "idle" &&
          cryptoData.map((coin) => (
            <SidebarItem
              key={coin.id}
              coin={coin}
              baseCurrency={baseCurrency}
            />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
