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
    <div className="scrollbar-thumb-rounded-full scrollbar-h-4 flex h-screen min-w-72 flex-col items-center space-y-2 overflow-y-scroll bg-white p-4 scrollbar scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-50">
      <p className="my-4 text-center text-xl font-bold">
        Cryptocurrency by m.cap
      </p>
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
