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
  const [unitPercentages, setUnitPercentages] = useState([]);

  const hanleReadAmountOrders = () => {
    axios
      .get(RoutesList.api.service_orders.read.graphics.amount_orders)
      .then((res) => {
        // console.log(res.data);

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

  const hanleReadUnitPercentages = () => {
    axios
      .get(RoutesList.api.service_orders.read.graphics.unit_percentages)
      .then((res) => {
        console.log(res.data);

        if (!res.data.status) {
          const values = [];

          if (res.data.cont_success != null) {
            let success =
              (parseInt(res.data.cont_success) * 100) / res.data.cont;
            values.push(success);
          }

          if (res.data.cont_err != null) {
            let error = (parseInt(res.data.cont_err) * 100) / res.data.cont;
            values.push(error);
          }

          setUnitPercentages(values);
        }
      });
  };

  useEffect(() => {
    hanleReadAmountOrders();
    hanleReadUnitPercentages();
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
              <Chip label="Porcentaje de unidades" color="dark-blue" />
            </Divider>
          </Box>

          {/* // otra grafica  */}
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
              labels: ["PORCENTAJE BUENAS", "PORCENTAJE MALAS"],
              datasets: [
                {
                  label: "Cantidad Ordenes",
                  data: unitPercentages,
                  backgroundColor: ["rgb(18, 170, 0)","rgb(255, 0, 0)"],
                  borderColor: [
                    "rgba(18, 170, 0, 0.5)",
                    "rgba(255, 0, 0, 0.5)",
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
