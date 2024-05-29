/**
 * Component for selecting cryptocurrencies.
 *
 * This component allows the user to select up to two cryptocurrencies from a list of available options.
 * It displays a dropdown menu with checkboxes for each cryptocurrency, and shows the selected cryptocurrencies in a compact format.
 * If the user tries to select more than two cryptocurrencies, an error message is displayed.
 *
 * @returns {JSX.Element} The SelectCrypto component.
 */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { capitilize } from "../../utils/helpers";
import Error from "../../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCrypto } from "./dataChartSlice";

function SelectCrypto() {
  const [isClose, setIsClose] = useState(true);
  const [multiSelectError, setMultiSelectError] = useState("");
  const [showError, setShowError] = useState(false);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const { selectedCrypto } = useSelector((state) => state.dataChart);
  const { cryptoData: coinList, status: coinListStatus } = useSelector(
    (state) => state.sidebar,
  );

  // allowing the user to select upto two coins
  const handleSelection = (coinId) => {
    if (selectedCrypto.includes(coinId)) {
      dispatch(
        setSelectedCrypto(selectedCrypto.filter((item) => item !== coinId)),
      );
    } else if (selectedCrypto.length < 2) {
      dispatch(setSelectedCrypto([...selectedCrypto, coinId]));
    } else {
      setMultiSelectError("Upto 2 coins only");
    }
  };

  // clearing multiselect error after 1 sec
  useEffect(() => {
    if (multiSelectError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setMultiSelectError("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [multiSelectError]);

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

  const handleclick = () => {
    setIsClose((isClose) => !isClose);
  };

  return (
    <div ref={ref}>
      <div
        className="relative flex h-8 w-44 items-center justify-between rounded-lg bg-blue-50 py-1 pl-6 pr-2"
        onClick={() => handleclick()}
      >
        <div className="w-36 overflow-hidden text-nowrap pr-4">
          {coinListStatus === "loading"
            ? "Loading..."
            : coinListStatus === "Error"
              ? "error"
              : selectedCrypto.length
                ? selectedCrypto
                    .map((id) => capitilize(id))
                    .join(", ")
                    .slice(0, 16) + (selectedCrypto.length > 1 ? "..." : "")
                : "Select Coins"}
        </div>
        <div className="justify-self-end">
          {isClose ? <FaAngleDown /> : <FaAngleUp />}
        </div>
      </div>

      <div
        className={`absolute  h-56 space-y-3 overflow-y-scroll rounded-lg border-2 border-gray-300 bg-white p-3 ${isClose && "invisible"} scrollbar-thin`}
      >
        {" "}
        {showError && (
          <div className="fixed bg-white bg-opacity-60 backdrop-blur-md">
            {" "}
            <Error message={multiSelectError} />
          </div>
        )}
        {coinList.map((item) => {
          return (
            <div
              key={item.id}
              value={item.id}
              className="flex items-baseline space-x-2"
            >
              <input
                type="checkbox"
                id={`checkBox${item.id}`}
                checked={selectedCrypto.includes(item.id)}
                onChange={() => handleSelection(item.id)}
              />
              <label htmlFor={`checkBox${item.id}`}>{item.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCrypto;
