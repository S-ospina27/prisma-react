import { Box, Button, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogForm from "../components/common/DialogForm";
import ServiceRequestSelect from "../components/common/ServiceRequestSelect";
import DataTable from "../Components/DataTable";

import ColumnsTable from "../components/tools/ColumnsTable";
import RoutesList from "../components/tools/RoutesList";

import TextFieldFilled from "../components/common/TextFieldFilled";

function Payments({ loading, alert }) {
  const [payments, setPayments] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const [idservice_request, setIdservice_request] = useState("");
  const [payments_value, setPayments_value] = useState("");

  const setFields = (
    row = {
      idservice_request: "",
      payments_value: "",
    }
  ) => {
    setIdservice_request(row.idservice_request);
    setPayments_value(row.payments_value);
  };

  const handleReadPayments = () => {
    axios.get(RoutesList.api.payments.read).then((res) => {
      setPayments(!res.data.status ? res.data : []);
    });
  };

  const handleCreatePayments = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("idservice_request", idservice_request.split("-").pop().trim());
    form.append("payments_value", payments_value);

    axios.post(RoutesList.api.payments.create, form).then((res) => {
      // console.log(res.data);

      handleReadPayments();
      setFields();
      loading(false);
      alert({
        open: true,
        message: res.data.message,
        severity: res.data.status,
      });
    });
  };

  const handleUpdatePayments = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleReadPayments();
  }, []);

  return (
    <Box my={3}>
      <Container>
        <Box my={3}>
          <Divider>
            <Chip label={"Pagos"} color={"blue"} />
          </Divider>
        </Box>

        <Box mb={3}>
          <form onSubmit={handleCreatePayments}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ServiceRequestSelect
                  label={"Ordenes Solicitudes"}
                  value={idservice_request}
                  setValue={setIdservice_request}
                  required
                  selected={["FINALIZADO", "NOVEDAD"]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextFieldFilled
                  label={"Valor"}
                  value={payments_value}
                  setValue={setPayments_value}
                  required
                  format
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
              <Button type="submit" variant="contained" color="blue">
                {"Crear"}
              </Button>
            </Box>
          </form>
        </Box>

        <DataTable
          reload={handleReadPayments}
          rows={payments}
          columns={ColumnsTable.payments}
          onRowClick={{
            open: setOpenEdit,
            set: setFields,
          }}
          getRowId={"idpayments"}
          sx={{
            height: "450px",
          }}
        />
      </Container>

      <DialogForm
        title={"Actualizar Pago"}
        open={openEdit}
        setOpen={setOpenEdit}
        button={{
          type: "submit",
          label: "Actualizar",
          onSubmit: handleUpdatePayments,
        }}
        content={
          <Box>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                <ServiceRequestSelect
                  label={"Ordenes Solicitudes"}
                  value={idservice_request}
                  setValue={setIdservice_request}
                  required
                  selected={["FINALIZADO", "NOVEDAD"]}
                />
              </Grid> */}
            </Grid>
          </Box>
        }
      />
    </Box>
  );
}

export default Payments;
