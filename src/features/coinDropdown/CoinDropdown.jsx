/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "./coinDropdownSlice";
import { useEffect } from "react";

function CoinDropdown({ selectedCoin, onChange, type }) {
  const dispatch = useDispatch();
  const { coins, status } = useSelector((state) => state.coinDropdown);

  const className = ` ${type === "baseCurrency" ? "bg-white" : "bg-gray-50"} px-4 py-2 rounded-lg  outline-blue-400 focus:outline`;

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  if (status === "loading")
    return (
      <select className={className}>
        <option>Loading...</option>
      </select>
    );

  if (status === "error")
    return (
      <select className={className}>
        <option>Error</option>
      </select>
    );

  return (
    <select className={className} value={selectedCoin} onChange={onChange}>
      {coins.map((coin, index) => (
        <option value={`${coin}`} key={index}>
          {coin}
        </option>
      ))}
    </select>
  );
}

export default CoinDropdown;
