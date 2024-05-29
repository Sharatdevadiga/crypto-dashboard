import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#60a5fa", "#f87171", "#4ade80", "#a78bfa", "#fde047"];
const SECTIONS = 5;

// Chart options
export const pieChartOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        boxHeight: 8,
        padding: 16,
        font: {
          weight: "bold",
          size: 13,
        },
      },
      position: "right",
    },
  },
  layout: {},
};

export const getPiechartData = (data) => {
  // getting labels and remaining
  const mCap = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const labels = mCap
    .map((coin) => `${coin[0]} (${coin[1].toFixed(2)}%)`)
    .slice(0, SECTIONS - 1);
  const reaminingPercent = mCap
    .slice(SECTIONS - 1)
    .reduce((acc, coin) => acc + coin[1], 0);
  labels.push(`Other (${reaminingPercent.toFixed(2)}%)`);

  const datasets = [
    {
      label: "Cryptocurrencies market share",
      data: [
        ...mCap.map((coin) => coin[1]).slice(0, SECTIONS - 1),
        reaminingPercent,
      ],
      backgroundColor: colors,
      borderColor: "#94a3b8",
      borderWidth: 1,
    },
  ];

  return {
    labels,
    datasets,
  };
};
