import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import UsersSelect from "../components/common/UsersSelect";

import RoutesList from "../components/tools/RoutesList";
import { getHeader, getJWT } from "../components/tools/SessionSettings";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";

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
  const [timeline, setTimeline] = useState([]);
  const [idusers_technical, setIdusers_technical] = useState("");
  const [percentage, setPercentage] = useState(0);
  const DaysSolution = [];

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

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

  const handleReadTotalChargesWarranty = () => {
    axios
      .get(
        RoutesList.api.service.request.read.graphics.total_charges_warranty,
        getHeader()
      )
      .then((res) => {
        // console.log(res.data);
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
      });
  };

  const hanlereadAverageTime = (e) => {
    e.preventDefault();
    loading(true);

    const route =
      RoutesList.api.service.request.read.graphics.read_average_time;

    axios
      .get(
        route + `/${idusers_technical.split("-").shift().trim()}`,
        getHeader()
      )
      .then((res) => {
        console.log(res.data);
        loading(false);

        if (!res.data.status) {
          setIdusers_technical("");
          setTimeline(res.data);
          let dateSolution1 = 0;
          let dateSolution2 = 0;
          let dateAssigment1 = 0;
          let dateAssigment2 = 0;

          res.data.forEach((request) => {
            dateSolution1 = dayjs(request.service_request_date_visit);
            dateSolution2 = dayjs(request.service_request_date_close);
            DaysSolution.push(dateSolution2.diff(dateSolution1, "day"));
          });

          const result = DaysSolution.reduce(
            (total, diference) => total + diference,
            0
          );
          const amount = DaysSolution.length;
          // console.log(ejemplo)
          setPercentage(Math.round(result / amount));
        } else {
          alert({
            open: true,
            message: "No hay datos disponibles",
            severity: res.data.status,
          });
        }
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
    <>
      <Box my={3}>
        <Divider>
          <Chip label={"Dashboard"} color="blue" />
        </Divider>
      </Box>

      <Container>
        <Box my={5}>
          {idroles === 3 && (
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
          )}

          {idroles === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box mb={3}>
                      <Divider textAlign="left">
                        <Chip
                          label="Cantidad Ordenes de servicio"
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

                  <Grid item xs={12}>
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
                            backgroundColor: [
                              "rgb(18, 170, 0)",
                              "rgb(255, 0, 0)",
                            ],
                            borderColor: [
                              "rgba(18, 170, 0, 0.5)",
                              "rgba(255, 0, 0, 0.5)",
                            ],
                          },
                        ],
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
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
                </Grid>
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

                <form onSubmit={hanlereadAverageTime}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <UsersSelect
                        value={idusers_technical}
                        setValue={setIdusers_technical}
                        selected={["TECNICO"]}
                        required
                      />

                      <Box
                        mt={3}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="dark-blue"
                        >
                          {"Buscar"}
                        </Button>
                      </Box>
                    </Grid>

                    {timeline.length > 0 && (
                      <Grid item xs={12}>
                        <Alert variant="filled" severity="info">
                          {"Tiempo promedio en dar solucion a solicitudes es de " +
                            percentage +
                            " días"}
                        </Alert>

                        <Timeline>
                          {timeline.map((request, keyRequest) => (
                            <TimelineItem key={keyRequest}>
                              <TimelineOppositeContent
                                sx={{ m: "auto 0" }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                              >
                                {request.idservice_states === 6
                                  ? `Fecha registro: ${request.service_request_creation_date}`
                                  : request.idservice_states === 8
                                  ? `Fecha cierre: ${request.service_request_date_close}`
                                  : `Fecha visita: ${request.service_request_date_visit}`}
                              </TimelineOppositeContent>

                              <TimelineSeparator>
                                <TimelineConnector />

                                <TimelineDot
                                  color={
                                    request.idservice_states === 6
                                      ? "warning"
                                      : request.idservice_states === 8
                                      ? "success"
                                      : request.idservice_states === 4
                                      ? "error"
                                      : request.idservice_states === 9
                                      ? "error"
                                      : "blue"
                                  }
                                >
                                  {request.idservice_states === 6 ? (
                                    <ScheduleIcon />
                                  ) : request.idservice_states === 8 ? (
                                    <CheckIcon />
                                  ) : request.idservice_states === 4 ? (
                                    <CloseIcon />
                                  ) : request.idservice_states === 9 ? (
                                    <ErrorOutlineIcon />
                                  ) : (
                                    <MoreHorizIcon />
                                  )}
                                </TimelineDot>

                                <TimelineConnector />
                              </TimelineSeparator>

                              <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Typography variant="h5" component="span">
                                  {`Guía-${request.idservice_request}`}
                                </Typography>

                                <Typography
                                  sx={{ fontWeight: 500 }}
                                >{`Estado: ${request.service_type}`}</Typography>
                                <Typography>{`Departamento: ${request.departments_name}`}</Typography>
                                <Typography>{`Ciudad: ${request.cities_name}`}</Typography>
                              </TimelineContent>
                            </TimelineItem>
                          ))}
                        </Timeline>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
