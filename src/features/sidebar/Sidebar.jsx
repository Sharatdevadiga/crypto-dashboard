/**
 * Sidebar component for displaying cryptocurrency data.
 */
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
    <div className="custom-scrollbar relative mx-auto flex h-screen w-[90%] flex-col items-center space-y-2 overflow-y-scroll rounded-lg bg-white px-2 pb-4 pt-0 scrollbar-thin md:w-[100%]">
      <div className="sticky top-0 z-10 mb-4 w-full rounded-t-lg bg-blue-50/50 px-2 py-3 text-center text-xl font-bold backdrop-blur backdrop-filter dark:bg-slate-800/50 ">
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
