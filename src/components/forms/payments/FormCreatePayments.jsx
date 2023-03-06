import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ServiceRequestSelect from "../../common/ServiceRequestSelect";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormCreatePayments({ alert, loading }) {
  const [idservice_request, setIdservice_request] = useState("");

  const handleCreatePayments = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("idservice_request", idservice_request.split("-").pop().trim());

    axios
      .post(RoutesList.api.payments.create, form, getHeader())
      .then((res) => {
        // console.log(res.data);

        loading(false);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
        setIdservice_request("");
      });
  };

  return (
    <form onSubmit={handleCreatePayments}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <ServiceRequestSelect
            label={"Ordenes Solicitudes"}
            value={idservice_request}
            setValue={setIdservice_request}
            required
            selected={["FINALIZADO", "NOVEDAD"]}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant={"contained"} type="submit">
          {"Crear"}
        </Button>
      </Box>
    </form>
  );
}

export default FormCreatePayments;
