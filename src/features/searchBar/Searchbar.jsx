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
  };

  // search results
  const results = !searchKey
    ? coinList
    : coinList.filter((item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()),
      );

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex items-center w-full px-4 bg-white rounded-md shadow-sm outline-blue-400 focus:outline">
        <HiMagnifyingGlass />
        <input
          type="text"
          placeholder="Search by coin"
          value={searchKey}
          onChange={() => handleChange()}
          onClick={() => handleSearchClick()}
          className="w-full px-4 py-2 outline-none"
        />
      </div>
      {isOptionsClosed && (
        <div className="absolute left-0 z-50 w-full h-48 px-6 py-2 overflow-y-scroll bg-white border-2 rounded-lg scrollbar-thin">
          {coinListStatus === "loading" && <Loader />}
          {coinListStatus === "error" && <Error message="Error" />}
          {results.length ? (
            <ul>
              {results.map((coin) => (
                <button
                  className={`block w-full px-1 py-0.5 text-left hover:bg-blue-100 ${selectedCrypto.includes(coin.id) && "bg-blue-50"} flex items-baseline gap-2`}
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
