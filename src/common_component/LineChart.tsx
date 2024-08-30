import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
          borderColor: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
        display: props.labels,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
          borderColor: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
        display: props.labels,
      },
    },
  };

  return (
    <>
      {props.chartType === "bar" ? (
        <Bar data={props.data} options={options} />
      ) : (
        <Line data={props.data} options={options} />
      )}
    </>
  );
};

export default LineChart;
