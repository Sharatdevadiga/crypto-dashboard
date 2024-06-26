/**
 * Renders a set of duration buttons for selecting a time period.
 */
import { setFromDate } from "./dataChartSlice";
import { useDispatch, useSelector } from "react-redux";

function DurationButtons() {
  const dispatch = useDispatch();
  const { fromDate } = useSelector((state) => state.dataChart);


  const periods = ["1D", "1W", "1M", "6M", "1Y"];
  return (
    <div className="flex gap-1 text-xs font-bold ">
      {periods.map((period) => (
        <button
          key={period}
          value={period}
          className={`rounded-md px-3 py-1 outline-blue-400 hover:bg-blue-100 focus:outline dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700  ${
            fromDate === period
              ? "bg-blue-100 outline outline-blue-400"
              : "bg-blue-50"
          }`}
          onClick={(e) => dispatch(setFromDate(e.target.value))}
        >
          {period}
        </button>
      ))}
    </div>
  );
}

export default DurationButtons;
