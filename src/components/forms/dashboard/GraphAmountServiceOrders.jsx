import { Box, Chip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function GraphAmountServiceOrders() {
  const [amountOrders, setAmountOrders] = useState([]);
  const [labelsAmountOrders, setLabelsAmountOrders] = useState([]);

  const hanleReadAmountOrders = () => {
    axios
      .get(
        RoutesList.api.service.orders.read.graphics.amount_orders,
        getHeader()
      )
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

  useEffect(() => {
    hanleReadAmountOrders();
  }, []);

  return (
    <>
      <Box mb={3}>
        <Divider textAlign="left">
          <Chip label="Cantidad Ordenes de servicio" color="dark-blue" />
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
    </>
  );
}

export default GraphAmountServiceOrders;
