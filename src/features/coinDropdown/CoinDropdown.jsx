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
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function CoinDropdown({ selectedCoin, onChange, type }) {
  const ref = useRef(null);
  const [isClose, setIsClose] = useState(true);
  const { coins, status } = useSelector((state) => state.coinDropdown);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  function handleOpen() {
    setIsClose((isClose) => !isClose);
  }

  function handleClick(e) {
    onChange(e);
    setIsClose(true);
  }

  // if clicked outside component the close it
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsClose(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // custom dropdown menu
  return (
    <div className="relative" ref={ref}>
      {/* selector */}
      <div
        className={` ${type === "baseCurrency" ? "bg-white" : "bg-gray-50"} dark-text-white flex items-center  gap-1 rounded-lg px-4 py-2 outline-blue-400 focus:outline dark:bg-slate-900 `}
        value={selectedCoin}
        onClick={() => handleOpen()}
      >
        {selectedCoin.toUpperCase()}
        <div className="justify-self-end">
          {isClose ? <FaAngleDown /> : <FaAngleUp />}
        </div>
      </div>
      {/* options */}
      {!isClose && (
        <div className="custom-scrollbar absolute left-0 z-10 h-48 w-48 overflow-y-scroll rounded-lg border-2 bg-white px-6 py-2 dark:border-gray-700 dark:bg-slate-950">
          {status === "loading" && <Loader />}
          {status === "error" && <Error message="Error" />}
          {coins ? (
            <ul>
              {coins.map((coin) => (
                <button
                  className={`block w-full border-b-gray-500 px-1 py-0.5 text-left hover:bg-blue-100 dark:hover:bg-slate-800 ${selectedCoin === coin && "border-blue-50 dark:border-slate-500"} flex items-baseline gap-2`}
                  key={`option${coin}`}
                  value={coin}
                  onClick={(e) => handleClick(e)}
                >
                  {coin}
                  {selectedCoin === coin && <IoCheckmarkCircleOutline />}
                </button>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default CoinDropdown;

// INBUILT SELECTOR
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCoins } from "./coinDropdownSlice";
// import { useEffect } from "react";

// function CoinDropdown({ selectedCoin, onChange, type }) {
//   const dispatch = useDispatch();
//   const { coins, status, error } = useSelector((state) => state.coinDropdown);

//   useEffect(() => {
//     dispatch(fetchCoins());
//   }, []);

//   // ////////////////////
//   // custom dropdown test

//   // //////////////////////

//   return (
//     <>
//       <select
//         className={` ${type === "baseCurrency" ? "bg-white" : "bg-gray-50"} dark-text-white rounded-lg px-4  py-2 outline-blue-400 focus:outline dark:bg-slate-900`}
//         value={selectedCoin}
//         onChange={onChange}
//       >
//         {status === "error" || (error && <option>Error</option>)}
//         {status === "loading" && <option>Loading...</option>}
//         {coins &&
//           coins.map((coin, index) => (
//             <option value={`${coin}`} key={index}>
//               {coin.toUpperCase()}
//             </option>
//           ))}
//       </select>

//     </>
//   );
// }

// export default CoinDropdown;
