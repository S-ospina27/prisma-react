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
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
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
  Legend,
  PointElement,
  LineElement
);

function Dashboard({ loading, alert }) {
  const [idroles, setIdroles] = useState(getJWT("idroles"));
  const [colors, setColors] = useState([
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      borderColor: "rgb(29, 238, 165)",
      backgroundColor: "rgba(29, 238, 165, 0.5)",
    },
    {
      borderColor: "rgb(137, 238, 29)",
      backgroundColor: "rgba(137, 238, 29, 0.5)",
    },
    {
      borderColor: "rgb(29, 83, 238)",
      backgroundColor: "rgba(29, 83, 238, 0.5)",
    },
    {
      borderColor: "rgb(254, 78, 185)",
      backgroundColor: "rgba(254, 78, 185, 0.5)",
    },
    {
      borderColor: "rgb(254, 214, 78)",
      backgroundColor: "rgba(254, 214, 78, 0.5)",
    },
    {
      borderColor: "rgb(78, 217, 254)",
      backgroundColor: "rgba(78, 217, 254, 0.5)",
    },
    {
      borderColor: "rgb(181, 13, 148)",
      backgroundColor: "rgba(181, 13, 148, 0.5)",
    },
  ]);

  const [amountOrders, setAmountOrders] = useState([]);
  const [labelsAmountOrders, setLabelsAmountOrders] = useState([]);
  const [unitPercentages, setUnitPercentages] = useState([]);
  const [warranty, setWarranty] = useState([]);
  const [totalChargesPerMonth, setTotalChargesPerMonth] = useState([]);
  const [totalChargesWarranty, settotalChargesWarranty] = useState([]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

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

  const hanleReadCountWarranty = () => {
    axios
      .get(RoutesList.api.service.request.read.graphics.count_warranty)
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

  const handleReadTotalChargesPerMonth = () => {
    axios
      .get(RoutesList.api.service.request.read.graphics.total_charges_per_month)
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

  const handleReadTotalChargesWarranty = () => {
    axios
      .get(RoutesList.api.service.request.read.graphics.total_charges_warranty)
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
        console.log(items);
        settotalChargesWarranty(items);
      });
  };

  useEffect(() => {
    if (idroles === 1) {
      hanleReadAmountOrders();
      hanleReadUnitPercentages();
      hanleReadCountWarranty();
      handleReadTotalChargesPerMonth();
      handleReadTotalChargesWarranty();
    }
  }, []);

  return (
    <Box mx={5} my={5}>
      <Box mb={3}>
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
          <Grid item xs={12} sm={12} md={6} lg={4}>
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
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip
                  label="Porcentaje de unidades ordenes de servicio"
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
                    borderColor: [
                      "rgba(18, 170, 0, 0.5)",
                      "rgba(255, 0, 0, 0.5)",
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip
                  label="Garantias ordenes de solicitudes"
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
                labels: ["SiN ASIGNAR", "CON GARANTIA", "SIN GARANTIA"],
                datasets: [
                  {
                    label: "Cantidad garantia",
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
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box mb={5}>
              <Divider textAlign="left">
                <Chip
                  label="Valor total garantias ordenes de solicitudes por mes"
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
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box mb={5}>
              <Divider textAlign="left">
                <Chip
                  label="Valor total sin garantias ordenes de solicitudes por mes"
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
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box mb={5}>
              <Divider textAlign="left">
                <Chip
                  label="Seguimiento de guias ordenes de solicitud"
                  color="dark-blue"
                />
              </Divider>
            </Box>
             <form>
              
             </form>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
