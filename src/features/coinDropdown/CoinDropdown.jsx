/**
 * A dropdown component for selecting a coin.
 *
 * @component
 * @param {string} selectedCoin - The currently selected coin.
 * @param {function} onChange - The function to be called when the selected coin changes.
 * @param {string} type - The type of the dropdown (e.g., "baseCurrency").
 * @returns {JSX.Element} The CoinDropdown component.
 */
/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "./coinDropdownSlice";
import { useEffect } from "react";

function CoinDropdown({ selectedCoin, onChange, type }) {
  const dispatch = useDispatch();
  const { coins, status, error } = useSelector((state) => state.coinDropdown);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return (
    <select
      className={` ${type === "baseCurrency" ? "bg-white" : "bg-gray-50"} rounded-lg px-4 py-2  outline-blue-400 focus:outline`}
      value={selectedCoin}
      onChange={onChange}
    >
      {status === "error" || (error && <option>Error</option>)}
      {status === "loading" && <option>Loading...</option>}
      {coins &&
        coins.map((coin, index) => (
          <option value={`${coin}`} key={index}>
            {coin}
          </option>
        ))}
    </select>
  );
}

export default CoinDropdown;
