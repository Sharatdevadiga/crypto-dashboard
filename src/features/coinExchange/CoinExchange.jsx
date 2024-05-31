/**
 * Component for exchanging coins.
 *
 * This component allows users to select a coin to sell and a coin to buy, enter the amount of the selling coin, and calculate the converted value in the buying coin based on the exchange rates fetched from the server.
 */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CoinDropdown from "../coinDropdown/CoinDropdown";
import { setCoinCount, setFromCoin, setToCoin } from "./coinExchangeSlice";
import { fetchExchangeRate } from "./coinExchangeSlice";

function CoinExchange() {
  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, []);

  const dispatch = useDispatch();
  const { fromCoin, toCoin, rates, coinCount } = useSelector(
    (state) => state.coinExchange,
  );

  const [convertedVal, setConvertedVal] = useState(0);

  function handleClick() {
    console.log(rates, fromCoin, toCoin, +coinCount);
    const coin1Data = rates[`rates`][fromCoin];
    const coin2Data = rates[`rates`][toCoin];
    if (!coin1Data.value || !coin2Data.value)
      setConvertedVal("Data not available");
    setConvertedVal(+coinCount * coin1Data.value * coin2Data.value);
  }

  return (
    <div className="overflow-none relative flex flex-col items-center gap-6 rounded-lg rounded-md bg-white p-6 dark:bg-slate-950 md:px-6 lg:py-6 xl:px-16">
      <p className="text-lg font-bold">Exchange Coins</p>

      <div className="space-y-6">
        {/* sell options */}
        <div className="flex justify-center gap-8 ">
          <div className="flex items-center gap-6 font-semibold">
            <p className="text-sm text-red-600">Sell</p>
            <CoinDropdown
              selectedCoin={fromCoin}
              onChange={(e) => dispatch(setFromCoin(e.target.value))}
            />
          </div>

          <input
            type="number"
            className="w-24 self-end rounded-lg border-2 px-2 py-2 text-center text-sm outline-blue-400 focus:outline dark:bg-slate-900 md:w-24 md:px-1 lg:w-28 xl:w-36 xl:px-4"
            placeholder="Enter Val"
            value={coinCount}
            onChange={(e) => dispatch(setCoinCount(e.target.value))}
          />
        </div>

        {/* buy options */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-6 font-semibold">
            <p className="text-sm text-green-600">Buy</p>
            <CoinDropdown
              selectedCoin={toCoin}
              onChange={(e) => dispatch(setToCoin(e.target.value))}
            />
          </div>
          <span className="w:24 rounded-lg py-2 text-sm font-semibold text-green-700 md:w-24 md:px-1 lg:w-28 xl:w-36 xl:px-4">
            {convertedVal} {toCoin}
          </span>
        </div>
      </div>

      {/* exchange button */}
      <div>
        <button
          className="w-32 transform self-center rounded-lg bg-blue-600 px-6 py-2 text-center text-white transition-all duration-150 ease-in-out hover:bg-blue-500 active:scale-95 "
          onClick={() => handleClick()}
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

export default CoinExchange;
