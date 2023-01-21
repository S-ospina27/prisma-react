import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogForm from "../components/common/DialogForm";
import DialogTransition from "../components/common/DialogTransition";
import ServiceRequestSelect from "../components/common/ServiceRequestSelect";
import DataTableCheckBox from "../components/DataTableCheckBox";

import ColumnsTable from "../components/tools/ColumnsTable";
import RoutesList from "../components/tools/RoutesList";
import { getHeader } from "../components/tools/SessionSettings";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import TextFieldFilled from "../components/common/TextFieldFilled";
function Payments({ loading, alert }) {
  const [payments, setPayments] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [opencreate, setOpencreate] = useState(false);
  const [items, setItems] = useState([]);

  const [idservice_request_c, setIdservice_request_c] = useState("");
  const [payments_value_c, setPayments_value_c] = useState("");

  const [idservice_request, setIdservice_request] = useState("");
  const [payments_value, setPayments_value] = useState("");

  const setFields = (
    row = {
      idservice_request: "",
      payments_value: "",
    }
  ) => {
    setIdservice_request(row.guide);
    setPayments_value(row.payments_value);
  };

  const handleReadPayments = () => {
    axios.get(RoutesList.api.payments.read, getHeader()).then((res) => {
      // console.log(res.data);
      setPayments(!res.data.status ? res.data : []);
    });
  };

  const handleCreatePayments = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append(
      "idservice_request",
      idservice_request_c.split("-").pop().trim()
    );

    axios
      .post(RoutesList.api.payments.create, form, getHeader())
      .then((res) => {
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

  const handleMassivePayments = () => {
    if (items.length > 0) {
      loading(true);
      const form = new FormData();
      items.forEach((item) => form.append("items[]", item));

      axios
        .post(RoutesList.api.payments.update.massive, form, getHeader())
        .then((res) => {
          // console.log(res.data);
          loading(false);
          handleReadPayments();
          alert({
            open: true,
            message: res.data.message,
            severity: res.data.status,
          });
        });
    } else {
      alert({
        open: true,
        message: "Debe seleccionar los pagos",
        severity: "warning",
      });
    }
  };

  const handleClose = () => {
    setOpencreate(false);
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

        {/* <Box mb={3}>
          <form onSubmit={handleCreatePayments}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
               
              </Grid>
            </Grid>

            <Box my={3}>
              <Button type="submit" variant="contained" color="blue">
                {"Crear"}
              </Button>
            </Box>
          </form>
        </Box> */}

        <DataTableCheckBox
          setValue={setItems}
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
          toolbar={
            <>
              <Button
                type="button"
                disabled={items.length > 0 ? false : true}
                onClick={handleMassivePayments}
                startIcon={<PriceCheckIcon />}
              >
                {"Pago"}
              </Button>

              <Button
                type="button"
                onClick={()=> setOpencreate(true)}
                startIcon={<PointOfSaleIcon />}
              >
                {"Crear Solicitud"}
              </Button>
            </>
          }
        />
      </Container>

      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={opencreate}
        onClose={handleClose}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={handleCreatePayments} >
          <DialogTitle>Crear Solicitud</DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
              <ServiceRequestSelect
                  label={"Ordenes Solicitudes"}
                  value={idservice_request_c}
                  setValue={setIdservice_request_c}
                  required
                  selected={["FINALIZADO", "NOVEDAD"]}
                />
              </Grid>          
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant={"contained"} size={"small"} type="submit">
              Crear
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
