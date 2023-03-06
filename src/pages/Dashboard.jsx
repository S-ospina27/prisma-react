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

import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import FormQRDistributor from "../components/forms/dashboard/FormQRDistributor";
import GraphAmountServiceOrders from "../components/forms/dashboard/GraphAmountServiceOrders";
import GraphPercentagesUnitsServiceOrders from "../components/forms/dashboard/GraphPercentagesUnitsServiceOrders";
import GraphGuaranteesRequestsOrders from "../components/forms/dashboard/GraphGuaranteesRequestsOrders";
import GraphTotalValueGuaranteesOrdersRequestsMonth from "../components/forms/dashboard/GraphTotalValueGuaranteesOrdersRequestsMonth";

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
        // console.log(res.data);
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

  return (
    <>
      <Box my={3}>
        <Divider>
          <Chip label={"Dashboard"} color="blue" />
        </Divider>
      </Box>

      <Container>
        <Box my={5}>
          {idroles === 3 && <FormQRDistributor alert={alert} />}

          {idroles === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <GraphAmountServiceOrders />
                  </Grid>

                  <Grid item xs={12}>
                    <GraphPercentagesUnitsServiceOrders />
                  </Grid>

                  <Grid item xs={12}>
                    <GraphGuaranteesRequestsOrders />
                  </Grid>

                  <Grid item xs={12}>
                    <GraphTotalValueGuaranteesOrdersRequestsMonth
                      getRandomInt={getRandomInt}
                      colors={colors}
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
