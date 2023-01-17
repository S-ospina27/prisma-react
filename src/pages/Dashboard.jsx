import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
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
import { getJWT } from "../components/tools/SessionSettings";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCode from "react-qr-code";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ loading, alert }) {
  const [idroles, setIdroles] = useState(getJWT("idroles"));

  const [amountOrders, setAmountOrders] = useState([]);
  const [labelsAmountOrders, setLabelsAmountOrders] = useState([]);
  const [unitPercentages, setUnitPercentages] = useState([]);

  const hanleReadAmountOrders = () => {
    axios
      .get(RoutesList.api.service.orders.read.graphics.amount_orders)
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
      .get(RoutesList.api.service.orders.read.graphics.unit_percentages)
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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${
        import.meta.env.VITE_SERVER_URL
      }/service/application-order-form/${getJWT("idusers")}`
    );

    alert({
      open: true,
      message: "URL copiada",
      severity: "info",
      time: 2000,
    });
  };

  const handleSendMessageWhatsapp = () => {
    const text =
      "URL de distribuidor: " +
      `${
        import.meta.env.VITE_SERVER_URL
      }/service/application-order-form/${getJWT("idusers")}`;

    window.open(`https://api.whatsapp.com/send?text=${text}`);
  };

  useEffect(() => {
    if (idroles === 1) {
      hanleReadAmountOrders();
      hanleReadUnitPercentages();
    }
  }, []);

  return (
    <Box mx={5}>
      <Box my={3}>
        <Divider>
          <Chip label={"Dashboard"} color="blue" />
        </Divider>
      </Box>

      {idroles === 3 && (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} mx={"auto"}>
              <Box my={3}>
                <QRCode
                  size={256}
                  value={`${
                    import.meta.env.VITE_SERVER_URL
                  }/service/application-order-form/${getJWT("idusers")}`}
                  viewBox={`0 0 256 256`}
                  style={{ width: "100%" }}
                />
              </Box>

              <Box mb={2}>
                <Button
                  variant="contained"
                  color="whatsapp"
                  startIcon={<WhatsAppIcon />}
                  sx={{ width: "100%" }}
                  onClick={handleSendMessageWhatsapp}
                >
                  {"Whatsapp"}
                </Button>
              </Box>

              <Box mb={2}>
                <Button
                  variant="contained"
                  color="gray"
                  startIcon={<ContentCopyIcon />}
                  sx={{ width: "100%" }}
                  onClick={handleCopy}
                >
                  {"Copiar"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}

      {idroles === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Box mb={3}>
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
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip label="Porcentaje de unidades" color="dark-blue" />
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
      )}
    </Box>
  );
}

export default Dashboard;
