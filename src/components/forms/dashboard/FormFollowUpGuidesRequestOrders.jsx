import { Alert, Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import UsersSelect from "../../common/UsersSelect";
import { useState } from "react";
import axios from "axios";

import ScheduleIcon from "@mui/icons-material/Schedule";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";
import dayjs from "dayjs";

function FormFollowUpGuidesRequestOrders({ alert, loading }) {
  const [timeline, setTimeline] = useState([]);
  const [idusers_technical, setIdusers_technical] = useState("");
  const [percentage, setPercentage] = useState(0);
  const DaysSolution = [];

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

          res.data.forEach((request) => {
            dateSolution1 = dayjs(request.service_request_date_visit);
            dateSolution2 = dayjs(request.service_request_date_close);
            DaysSolution.push(dateSolution2.diff(dateSolution1, "day"));
          });

          const result = DaysSolution.reduce((total, diference) => {
            return total + diference;
          }, 0);

          const amount = DaysSolution.length;
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

            <Box mt={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" color="dark-blue">
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
    </>
  );
}

export default FormFollowUpGuidesRequestOrders;
