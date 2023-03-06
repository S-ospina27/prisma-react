import { Box, Chip, Container, Divider } from "@mui/material";
import { useState } from "react";

import DataTablesPayments from "../components/forms/payments/DataTablesPayments";
import FormCreatePayments from "../components/forms/payments/FormCreatePayments";

function Payments({ loading, alert }) {
  return (
    <Box my={3}>
      <Container>
        <Box my={3}>
          <Divider>
            <Chip label={"Pagos"} color={"blue"} />
          </Divider>
        </Box>

        <Box mb={3}>
          <FormCreatePayments alert={alert} loading={loading} />
        </Box>

        <Divider />

        <DataTablesPayments alert={alert} loading={loading} />
      </Container>
    </Box>
  );
}

export default Payments;
