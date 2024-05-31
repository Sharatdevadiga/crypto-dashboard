/**
 * Renders a chart based on the selected chart type, cryptocurrency, date range, and base currency.
 * Fetches chart data from an API and displays it using react-chartjs-2 library.
 * Handles loading and error states.
 */
import { Bar, Line } from "react-chartjs-2";
import { getChartData } from "./ChartInfo";
import { useEffect, useState } from "react";
import { fetchChartData } from "./dataChartSlice";
import { getDateFromPeriodInUnix } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

function ChartBasedOnType() {
  const dispatch = useDispatch();
  const {
    chartType,
    selectedCrypto,
    fromDate,
    toDateInUnix,
    status,
    error,
    chartDataFromAPI,
  } = useSelector((state) => state.dataChart);

  const { baseCurrency } = useSelector((state) => state.coinDropdown);

  useEffect(() => {
    let fromDateInUnix = getDateFromPeriodInUnix(fromDate);
    dispatch(
      fetchChartData({
        from: fromDateInUnix,
        to: toDateInUnix,
        selected: selectedCrypto,
        baseCurrency: baseCurrency,
      }),
    );
  }, [fromDate, toDateInUnix, selectedCrypto, baseCurrency]);

  const [chartDataAndOPtions, setChartDataAndOptions] = useState({});

  useEffect(() => {
    const dataAndOptions = getChartData(
      chartDataFromAPI,
      fromDate,
      baseCurrency,
      chartType,
    );
    setChartDataAndOptions(dataAndOptions);
  }, [chartDataFromAPI, fromDate, baseCurrency, chartType]);

  const { chartData, defaultChartOptions, horizontalBarOptions } =
    chartDataAndOPtions;
  const chartOptions =
    chartType === "barH" ? horizontalBarOptions : defaultChartOptions;

  if (status === "loading") return <Loader />;
  if (status === "error" || error !== null) return <Error message={error} />;

  return (
    chartOptions &&
    chartData && (
      <div className="flex min-h-[450px] w-full items-center justify-center">
        {chartType === "line" && (
          <Line options={chartOptions} data={chartData} />
        )}
        {chartType === "barV" && (
          <Bar options={chartOptions} data={chartData} />
        )}
        {chartType === "barH" && (
          <Bar options={chartOptions} data={chartData}></Bar>
        )}
      </div>
    )
  );
}

export default ChartBasedOnType;
