import { Chip, Divider } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function GraphTotalValueWithoutGuaranteesRequestsOrdersMonth({
  colors,
  getRandomInt,
}) {
  const [totalChargesWarranty, settotalChargesWarranty] = useState([]);

  const handleReadTotalChargesWarranty = () => {
    axios
      .get(
        RoutesList.api.service.request.read.graphics.total_charges_warranty,
        getHeader()
      )
      .then((res) => {
        if (!res.data.status) {
          const items = [];

          Object.entries(res.data).forEach(([key, year]) => {
            let values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            year.forEach((month) => {
              values[month.month_item - 1] = parseInt(month.total_item);
            });

            const random = getRandomInt(0, colors.length);

            items.push({
              label: key,
              data: values,
              borderColor: colors[random].borderColor,
              backgroundColor: colors[random].backgroundColor,
            });
          });

          settotalChargesWarranty(items);
        }
      });
  };

  useEffect(() => {
    handleReadTotalChargesWarranty();
  }, []);

  return (
    <>
      <Box mb={5}>
        <Divider textAlign="left">
          <Chip
            label="Valor total sin Garantias Ordenes de Solicitudes por mes"
            color="dark-blue"
          />
        </Divider>
      </Box>

      <Line
        data={{
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: totalChargesWarranty,
        }}
        options={{
          responsive: true,
        }}
      />
    </>
  );
}

export default GraphTotalValueWithoutGuaranteesRequestsOrdersMonth;
