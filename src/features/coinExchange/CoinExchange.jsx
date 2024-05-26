import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CoinDropdown from "../coinDropdown/CoinDropdown";
import { setCoinCount, setFromCoin, setToCoin } from "./coinExchangeSlice";
import { fetchExchangeRate } from "./coinExchangeSlice";

function CoinExchange() {
  // on initial render, fetch exchange rates
  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, []);

  // hooks to get data and action from redux slice
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
    <div className="flex flex-col items-center gap-6 p-6 overflow-hidden bg-white rounded-md md:px-6 lg:py-6 xl:px-16">
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
            className="self-end w-24 px-2 py-2 text-sm text-center border-2 rounded-lg outline-blue-400 focus:outline md:w-24 md:px-1 lg:w-28 xl:w-36 xl:px-4"
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
          <span className="py-2 text-sm font-semibold text-green-700 rounded-lg w:24 md:w-24 md:px-1 lg:w-28 xl:w-36 xl:px-4">
            {convertedVal} {toCoin}
          </span>
        </div>
      </div>

      {/* exchange button */}
      <div className="self-center w-32 px-6 py-2 text-center text-white bg-blue-600 rounded-lg">
        <button onClick={() => handleClick()}>Exchange</button>
      </div>
    </div>
  );
}

export default CoinExchange;
