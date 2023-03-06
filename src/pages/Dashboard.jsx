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
import { useState } from "react";

import { getJWT } from "../components/tools/SessionSettings";

import FormQRDistributor from "../components/forms/dashboard/FormQRDistributor";
import GraphAmountServiceOrders from "../components/forms/dashboard/GraphAmountServiceOrders";
import GraphPercentagesUnitsServiceOrders from "../components/forms/dashboard/GraphPercentagesUnitsServiceOrders";
import GraphGuaranteesRequestsOrders from "../components/forms/dashboard/GraphGuaranteesRequestsOrders";
import GraphTotalValueGuaranteesOrdersRequestsMonth from "../components/forms/dashboard/GraphTotalValueGuaranteesOrdersRequestsMonth";
import GraphTotalValueWithoutGuaranteesRequestsOrdersMonth from "../components/forms/dashboard/GraphTotalValueWithoutGuaranteesRequestsOrdersMonth";
import FormFollowUpGuidesRequestOrders from "../components/forms/dashboard/FormFollowUpGuidesRequestOrders";

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

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
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
                <GraphAmountServiceOrders />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GraphPercentagesUnitsServiceOrders />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GraphGuaranteesRequestsOrders />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GraphTotalValueGuaranteesOrdersRequestsMonth
                  getRandomInt={getRandomInt}
                  colors={colors}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <GraphTotalValueWithoutGuaranteesRequestsOrdersMonth
                  getRandomInt={getRandomInt}
                  colors={colors}
                />
              </Grid>
            </Grid>
          )}

          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormFollowUpGuidesRequestOrders alert={alert} loading={loading} />
          </Grid> */}
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
