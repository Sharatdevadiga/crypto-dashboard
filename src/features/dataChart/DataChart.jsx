import SelectCrypto from "./SelectCrypto";
import SelectChart from "./SelectChart";
import DurationButtons from "./DurationButtons";
import ChartBasedOnType from "./ChartBasedOnType";

function DataChart() {
  return (
    <div className="min-h-96 space-y-4 bg-white p-6">
      <div className="flex flex-wrap justify-center gap-6 sm:flex lg:justify-between">
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
