/**
 * Searchbar component for searching and selecting cryptocurrencies.
 *
 * This component renders an input field with a magnifying glass icon for searching cryptocurrencies by name. It also displays a dropdown list of search results based on the user's input. The user can select a cryptocurrency from the dropdown list, and the selected cryptocurrency will be stored in the Redux store.
 *

 */
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCrypto } from "../dataChart/dataChartSlice";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

function Searchbar() {
  const dispatch = useDispatch();
  const { selectedCrypto } = useSelector((state) => state.dataChart);
  const { cryptoData: coinList, status: coinListStatus } = useSelector(
    (state) => state.sidebar,
  );
  const [isOptionsClosed, setIsOptionsClosed] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  // closing the search options when user clicks outside
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOptionsClosed(false);
        setSearchKey("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handler functions
  function handleSearchClick() {
    setIsOptionsClosed(true);
  }

  function handleChange(e) {
    setSearchKey(e.target.value);
  }

  const handleSelection = (coinId) => {
    dispatch(setSelectedCrypto([coinId]));
    setIsOptionsClosed(false);
    setSearchKey("");
  };

  // search results
  const results = !searchKey
    ? coinList
    : coinList.filter((item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()),
      );

  return (
    <div ref={searchRef} className="relative sm:w-full ">
      <div
        className="flex w-[100%] items-center rounded-md bg-white px-4 shadow-sm outline-blue-400 focus:outline lg:h-[100%] dark:bg-slate-950"
        onClick={handleSearchClick}
      >
        <HiMagnifyingGlass />
        <input
          type="text"
          placeholder="Search by coin"
          value={searchKey}
          onChange={(e) => handleChange(e)}
          className="w-full px-4 py-2 outline-none dark:bg-slate-950"
        />
      </div>
      {isOptionsClosed && (
        <div className="absolute left-0 z-50 h-48 w-full overflow-y-scroll rounded-lg border-2 bg-white px-6 py-2 scrollbar-thin dark:border-gray-700 dark:bg-slate-900">
          {coinListStatus === "loading" && <Loader />}
          {coinListStatus === "error" && <Error message="Error" />}
          {results.length ? (
            <ul>
              {results.map((coin) => (
                <button
                  className={`block w-full border-b-gray-500 px-1 py-0.5 text-left hover:bg-blue-100 dark:hover:bg-slate-800 ${selectedCrypto.includes(coin.id) && "border-blue-50 dark:border-slate-500"} flex items-baseline gap-2`}
                  key={`search-Option${coin.id}`}
                  value={coin.id}
                  onClick={() => handleSelection(coin.id)}
                >
                  {coin.id}
                  {selectedCrypto.includes(coin.id) && (
                    <IoCheckmarkCircleOutline />
                  )}
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

export default Searchbar;
