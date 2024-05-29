/**
 * Renders the DataChart component.
 *
 * This component displays a data chart with options to select the cryptocurrency, chart type, and duration.
 * It includes child components: SelectCrypto, SelectChart, DurationButtons, and ChartBasedOnType.
 *
 * @returns {JSX.Element} The rendered DataChart component.
 */
import SelectCrypto from "./SelectCrypto";
import SelectChart from "./SelectChart";
import DurationButtons from "./DurationButtons";
import ChartBasedOnType from "./ChartBasedOnType";

function DataChart() {
  return (
    <div className="min-h-96 max-w-full  space-y-4 bg-white px-1 py-6 sm:p-6">
      <div className="flex flex-wrap justify-center gap-6  sm:flex lg:justify-between">
        <DurationButtons />
        <div className="flex space-x-4">
          <SelectCrypto />
          <SelectChart />
        </div>
      </div>

      {/* chart */}

      <ChartBasedOnType />
    </div>
  );
}

export default DataChart;
