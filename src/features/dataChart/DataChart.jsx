import { useState } from "react";

// ///////////////////////////////////
import ChartJS from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 2001) - 1000,
      ),

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 2001) - 1000,
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// //////////////////////////////////

function DataChart() {
  const [days, setDays] = useState("6M");

  const handleClick = (e) => {
    setDays(e.target.value);
  };

  const periods = ["1D", "1W", "1M", "6M", "1Y"];

  return (
    <div className="space-y-4 bg-white p-6">
      {/* days, chart-type, currency */}
      <div className="flex flex-wrap justify-center gap-6 sm:flex sm:justify-between">
        <div className="flex gap-1 text-xs font-bold">
          {periods.map((period) => (
            <button
              key={period}
              value={period}
              className={`rounded-md px-3 py-1 outline-blue-400 hover:bg-blue-100 focus:outline  ${
                days === period
                  ? "bg-blue-100 outline outline-blue-400"
                  : "bg-blue-50"
              }`}
              onClick={handleClick}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="flex space-x-4">
          {/* coin selector */}
          <select
            name="coin selector"
            className="rounded-lg bg-blue-50 px-4 py-1 outline-blue-400 focus:outline"
          >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Etherum">Etherum</option>
          </select>

          {/* chart selector */}

          <select
            name="coin selector"
            className="rounded-lg bg-blue-50 px-4 py-1 outline-blue-400 focus:outline"
          >
            <option value="lineChart">Line chart</option>
            <option value="barChartH">Bar chart V</option>
            <option value="barChartV">Bar Chart H</option>
          </select>
        </div>
      </div>

      {/* chart */}
      <div className="flex w-full items-center justify-center">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default DataChart;
