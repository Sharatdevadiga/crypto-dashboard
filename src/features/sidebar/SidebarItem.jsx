/* eslint-disable react/prop-types */
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { capitilize } from "../../utils/helpers";

function SidebarItem({ coin, baseCurrency }) {
  const percentageChange = coin.price_change_percentage_24h;
  return (
    <div className="grid grid-cols-2 border-b-2 border-gray-200/30 p-3">
      <div>
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <img
            src={coin.image}
            alt="coin image"
            className="h-5 w-5 rounded-full border-2 border-blue-200 bg-blue-200"
          />
          {capitilize(coin.id)}
        </div>
        <p className="text-xs font-bold opacity-50">
          M.cap:{" "}
          <span>
            {coin.market_cap} {baseCurrency}
          </span>
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
