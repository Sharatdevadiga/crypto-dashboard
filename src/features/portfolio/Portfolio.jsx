import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Portfolio() {
  // array of
  const tailwindColors = ["#60a5fa", "#f87171", "#4ade80"];

  // Chart options
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          boxHeight: 8,
          padding: 16,
        },
        position: "right",
        align: "",
      },
    },
    layout: {},
  };

  const data = {
    labels: ["Tether", "Luna", "Etherum"],
    datasets: [
      {
        label: "Cryptocurrencies market share",
        data: [37.5, 37.5, 25],
        backgroundColor: tailwindColors,
        borderColor: tailwindColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-80 bg-white p-6">
      <div className="flex justify-between gap-12">
        <p className="text-lg font-bold">Portfolio</p>
        <p>
          <span className="opacity-40">Total value: </span>{" "}
          <span className="font-bold">$1000</span>
        </p>
      </div>
      <div className="self=center flex h-full items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default Portfolio;
