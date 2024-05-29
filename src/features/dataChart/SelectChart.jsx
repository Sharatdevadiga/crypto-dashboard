/**
 * Renders a select dropdown for selecting the type of chart.
 */
import { useDispatch, useSelector } from "react-redux";
import { setChartType } from "./dataChartSlice";

function SelectChart() {
  const dispatch = useDispatch();
  const { chartType } = useSelector((state) => state.dataChart);

  return (
    <select
      name="Chart selector"
      value={chartType}
      className="rounded-lg bg-blue-50 px-4 py-1 outline-blue-400 focus:outline"
      onChange={(e) => dispatch(setChartType(e.target.value))}
    >
      <option value="line">Line chart</option>
      <option value="barV">Bar chart V</option>
      <option value="barH">Bar Chart H</option>
    </select>
  );
}

export default SelectChart;
