import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
import axios from "axios";
import RoutesList from "../components/tools/RoutesList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [amountOrders, setAmountOrders] = useState([]);
  const [labelsAmountOrders, setLabelsAmountOrders] = useState([]);

  const hanleReadAmountOrders = () => {
    axios
      .get(RoutesList.api.service_orders.read.graphics.amount_orders)
      .then((res) => {
        if (!res.data.status) {
          const labels = [];
          const values = [];

          Object.entries(res.data).forEach(([key, amount]) => {
            values.push(amount.cont);
            labels.push(`${amount.service_type} - ${amount.cont}`);
          });

          setAmountOrders(values);
          setLabelsAmountOrders(labels);
        }
      });
  };

  useEffect(() => {
    hanleReadAmountOrders();
  }, []);

  return (
    <Box mx={5}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box my={5}>
            <Divider textAlign="left">
              <Chip label="Cantidad Ordenes" color="dark-blue" />
            </Divider>
          </Box>

          <Bar
            options={{
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              plugins: {
                legend: {
                  position: "top",
                  display: false,
                },
              },
            }}
            data={{
              labels: labelsAmountOrders,
              datasets: [
                {
                  label: "Cantidad Ordenes",
                  data: amountOrders,
                  backgroundColor: [
                    "rgb(42, 138, 194)",
                    "rgb(255, 255, 0)",
                    "rgb(18, 170, 0)",
                  ],
                  borderColor: [
                    "rgba(42, 138, 194, 0.5)",
                    "rgba(255, 255, 0, 0.5)",
                    "rgba(18, 170, 0, 0.5)",
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box my={5}>
            <Divider textAlign="right">
              <Chip label="Cantidad Ordenes" color="dark-blue" />
            </Divider>
          </Box>

          {/* // otra grafica  */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
