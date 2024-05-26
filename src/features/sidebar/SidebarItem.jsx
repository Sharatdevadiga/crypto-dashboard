/* eslint-disable react/prop-types */
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { capitilize } from "../../utils/helpers";

function SidebarItem({ coin }) {
  const percentageChange = coin.price_change_percentage_24h;
  return (
    <div className="grid grid-cols-2 p-3 border-b-2 border-gray-200/30">
      <div className=" space-y-1.5 ">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <img
            src={coin.image}
            alt="coin image"
            className="w-5 h-5 bg-blue-200 border-2 border-blue-200 rounded-full"
          />
          {capitilize(coin.id)}
        </div>
        <p className="text-xs opacity-50">
          Mkt.Cap: <span>$197,487</span>
        </p>
      </div>
      <div
        className={`justify-self-end ${percentageChange > 0 ? "text-green-500" : "text-red-500"}`}
      >
        <p className="flex items-center gap-2">
          <span>{percentageChange.toFixed(2)}%</span>
          {percentageChange > 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
        </p>
      </div>
    </div>
  );
}

export default SidebarItem;
