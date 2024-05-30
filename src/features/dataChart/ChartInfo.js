/**
 * Retrieves the chart data, default chart options, and horizontal bar options based on the provided data.
 *
 * @param {Array} dataFromAPI - The data received from the API.
 * @param {string} from - The starting point for aggregating the data.
 * @param {string} baseCurrency - The base currency for the price.
 * @returns {Object} - An object containing the chart data, default chart options, and horizontal bar options.
 */

import ChartJS from "chart.js/auto";
import aggregateData from "../../utils/dataAggregator";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function getChartData(dataFromAPI, from, baseCurrency) {
  if (!dataFromAPI.length) return {};

  const aggregatedChartData = dataFromAPI.map((item) => ({
    name: item[0],
    aggregatedData: aggregateData(item[1], from),
  }));

  const borderColors = ["#fb7185", "#60a5fa", "#4ade80", "#fbbf24"];
  const backgroundColors = [
    "rgba(251, 113, 134, 0.5)",
    "rgba(96, 165, 250, 0.5)",
    "rgba(74, 222, 128, 0.5)",
    "rgba(251, 191, 36, 0.5)",
  ];

  // eslint-disable-next-line no-unused-vars
  const priceFormatter = function (value, index, values) {
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M";
    }
    if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "K";
    }
    return value;
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

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
        position: "top",
      },
    },
  };

  let defaultChartOptions = {
    indexAxis: "x",
    responsive: true,
    ...commonChartOptions,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: `Price in ${baseCurrency}`,
        },

        ticks: {
          callback: priceFormatter,
        },
      },
    },
  };

  const horizontalBarOptions = {
    indexAxis: "y",
    responsive: true,
    ...commonChartOptions,
    scales: {
      y: {
        title: {
          display: true,
          text: "Time",
        },
      },
      x: {
        title: {
          display: true,
          text: `Price in ${baseCurrency}`,
        },
        ticks: {
          callback: priceFormatter,
        },
      },
    },
  };

  const labels = aggregatedChartData[0].aggregatedData.map((item) => item[0]);

  const chartData = {
    labels,
    datasets: aggregatedChartData.map((item, index) => ({
      label: item.name,
      data: item.aggregatedData.map((item) => item[1]),
      borderColor: borderColors[index],
      backgroundColor: backgroundColors[index],
    })),
  };

  return { chartData, defaultChartOptions, horizontalBarOptions };
}
