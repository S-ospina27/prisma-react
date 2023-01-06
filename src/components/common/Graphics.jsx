import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import RoutesList from "../tools/RoutesList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((type) => type.January),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Graphics = () => {
  const [typeProducts_read, setTypeProducts_read] = useState([]);
  const [dataGraphics, setDataGraphics] = useState([]);

  const handleReadTypeProducts = () => {
    axios.get(RoutesListList.api.products.types.read).then((res) => {
      !res.data.status && setTypeProducts_read(res.data);
    });
  };
  useEffect(() => {
    handleReadTypeProducts;
  }, []);
  return (
    <div>
      <Bar options={options} data={data} />;
    </div>
  );
};

export default Graphics;
