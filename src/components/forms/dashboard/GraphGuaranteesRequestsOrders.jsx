import { Box, Chip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function GraphGuaranteesRequestsOrders() {
  const [warranty, setWarranty] = useState([]);

  const hanleReadCountWarranty = () => {
    axios
      .get(
        RoutesList.api.service.request.read.graphics.count_warranty,
        getHeader()
      )
      .then((res) => {
        if (!res.data.status) {
          const values = [];
          res.data.forEach((row) => {
            values.push(row.cont === null ? 0 : row.cont);
          });
          setWarranty(values);
        }
      });
  };

  useEffect(() => {
    hanleReadCountWarranty();
  }, []);

  return (
    <>
      <Box mb={3}>
        <Divider textAlign="left">
          <Chip label="Garantias ordenes de solicitudes" color="dark-blue" />
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
          labels: ["SiN ASIGNAR", "CON GARANTIA", "SIN GARANTIA"],
          datasets: [
            {
              label: "Cantidad Garantia",
              data: warranty,
              backgroundColor: [
                "rgb(183, 167, 167)",
                "rgb(18, 170, 0)",
                "rgb(255, 0, 0)",
              ],
              borderColor: [
                "rgba(183, 167, 167 , 0.5)",
                "rgba(18, 170, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
            },
          ],
        }}
      />
    </>
  );
}

export default GraphGuaranteesRequestsOrders;
