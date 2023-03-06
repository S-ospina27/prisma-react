import { Box, Chip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function GraphTotalValueGuaranteesOrdersRequestsMonth({ colors, getRandomInt }) {
  const [totalChargesPerMonth, setTotalChargesPerMonth] = useState([]);

  const handleReadTotalChargesPerMonth = () => {
    axios
      .get(
        RoutesList.api.service.request.read.graphics.total_charges_per_month,
        getHeader()
      )
      .then((res) => {
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

        setTotalChargesPerMonth(items);
      });
  };

  useEffect(() => {
    handleReadTotalChargesPerMonth();
  }, []);

  return (
    <>
      <Box mb={5}>
        <Divider textAlign="left">
          <Chip
            label="Valor total Garantias Ordenes de Solicitudes por mes"
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
          datasets: totalChargesPerMonth,
        }}
        options={{
          responsive: true,
        }}
      />
    </>
  );
}

export default GraphTotalValueGuaranteesOrdersRequestsMonth;
