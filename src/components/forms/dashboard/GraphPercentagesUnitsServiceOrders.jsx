import { Box, Chip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function GraphPercentagesUnitsServiceOrders() {
  const [unitPercentages, setUnitPercentages] = useState([]);

  const hanleReadUnitPercentages = () => {
    axios
      .get(
        RoutesList.api.service.orders.read.graphics.unit_percentages,
        getHeader()
      )
      .then((res) => {
        // console.log(res.data);

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
    hanleReadUnitPercentages();
  }, []);

  return (
    <>
      <Box mb={3}>
        <Divider textAlign="left">
          <Chip
            label="Porcentaje de Unidades Ordenes de Servicio"
            color="dark-blue"
          />
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
          labels: ["PORCENTAJE BUENAS", "PORCENTAJE MALAS"],
          datasets: [
            {
              label: "Cantidad Ordenes",
              data: unitPercentages,
              backgroundColor: ["rgb(18, 170, 0)", "rgb(255, 0, 0)"],
              borderColor: ["rgba(18, 170, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
            },
          ],
        }}
      />
    </>
  );
}

export default GraphPercentagesUnitsServiceOrders;
