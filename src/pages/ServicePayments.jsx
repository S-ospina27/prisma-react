import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import DialogForm from "../components/common/DialogForm";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";
import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";
import UsersSelect from "../components/common/UsersSelect";
import PaidIcon from "@mui/icons-material/Paid";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { deepOrange, green } from "@mui/material/colors";
function ServicePayments({ loading, alert }) {
  const [idusers_technical, setIdusers_technical] = useState("");
  const [disable_left_button, setDisable_left_button] = useState(false);
  const [disable_right_button, setDisable_right_button] = useState(false);
  const [convert_payment_button, setConvert_payment_button] = useState(false);
  const [trigger_box, setTrigger_box] = useState(false);
  const [servicePayments, setServicePayments] = useState([]);

  // const setFields = (row) => {
  //   // console.log(row);
  //   setIdtechnical_inventory(row.idtechnical_inventory);
  //   setIdusers(row.fullname);
  //   setIdspare_parts(row.spare_parts_name);
  //   setTechnical_inventory_amount(row.technical_inventory_amount);
  //   setTechnical_inventory_quantity_used(row.technical_inventory_quantity_used);
  //   setTechnical_inventory_quantity_available(
  //     row.technical_inventory_quantity_available
  //   );
  //   setIdservice_states(row.idservice_states);
  //   setTechnical_inventory_description(
  //     row.technical_inventory_description == null
  //       ? ""
  //       : row.technical_inventory_description
  //   );
  // };

  const handleReadServicePayments = () => {
    axios.get(RoutesList.api.service.request.payment.read).then((res) => {
      // console.log(res.data);
      setServicePayments(!res.data.status ? res.data : []);
    });
  };

  // const handleUpdateinventoryTechnical = (e) => {
  //   e.preventDefault();
  //   setOpenCreatTechnical(false);
  //   loading(true);

  //   const form = new FormData();
  //   form.append("idservice_states", idservice_states);
  //   form.append("idtechnical_inventory", idtechnical_inventory);

  //   axios
  //     .post(RoutesList.api.service.technical_inventory.update, form)
  //     .then((res) => {
  //       // console.log(res.data);

  //       handleReadTechnical();
  //       alert({
  //         open: true,
  //         message: res.data.message,
  //         severity: res.data.status,
  //       });
  //       loading(false);
  //     });
  // };

  const convertRequestsPendingPaymentS = () => {
    setConvert_payment_button(true);
    const form = new FormData();
    form.append("idservice_states", 8);

    axios
      .post(RoutesList.api.service.request.payment.convert, form)
      .then((res) => {
        handleReadServicePayments();
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      });
    setTimeout(() => setConvert_payment_button(false), 2000);
    console.log("click");
  };

  const handlePayments = (e) => {
    e.preventDefault();
    console.log(idusers_technical)
    // if (idusers_technical != "") {
      if (disable_left_button === true) {
         setTrigger_box(true);
        console.log("no");
      } else {
        setTrigger_box(true);
        console.log("si");
      }
      setTimeout(() => {
        setDisable_left_button(false);
        setDisable_right_button(false);
      }, 2000);
    // }
    console.log("gonorrea gonorre");
  };
  useEffect(() => {
    handleReadServicePayments();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="blue" label={"Pagos"} />
        </Divider>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <form onSubmit={handlePayments}>
            <Grid item xs={12} m={2} sm={12} md={12}>
              <UsersSelect
                label={"Tecnicos"}
                value={idusers_technical}
                setValue={setIdusers_technical}
                required
                selected={["TECNICO"]}
              />
            </Grid>

            <Grid item xs={12} m={2} sm={12} md={12}>
              <ButtonGroup disableElevation variant="contained">
                <Button
                  color={"warning"}
                  disabled={disable_left_button}
                  onClick={() => setDisable_right_button(true)}
                  type="submit"
                >
                  Con Garantia
                </Button>

                <Button
                  disabled={disable_right_button}
                  onClick={() => setDisable_left_button(true)}
                  type="submit"
                >
                  Sin Garantia
                </Button>
              </ButtonGroup>
            </Grid>
          </form>
          {trigger_box === true && (
            <Grid item xs={12} m={2} sm={12} md={12}>
              <Box sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }}>
                <Grid item xs={12} m={2} sm={12} md={12}>
                  <Typography variant="h6">Nombre del tecnico</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Santiago Ospina rojas
                    <Avatar
                      sx={{ bgcolor: green[500] }}
                      variant="rounded"
                    ></Avatar>
                  </Typography>
                </Grid>
                <Grid item xs={12} m={2} sm={12} md={12}>
                  <Typography variant="h6">Fecha de generación</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    2022-01-23
                  </Typography>
                </Grid>
                <Grid item xs={12} m={2} sm={12} md={12}>
                  <Typography variant="h6">Valor Total</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    323.000
                  </Typography>
                  <Grid item xs={12} m={2} sm={12} md={12}>
                    <Button
                      variant={"contained"}
                      color={"error"}
                      onClick={() => {
                        setTrigger_box(false);
                      }}
                      type="button"
                    >
                      Cerrar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <DataTable
            reload={handleReadServicePayments}
            rows={servicePayments}
            columns={ColumnsTable.payments}
            getRowId={"idservice_request"}
            // onRowClick={{
            //   open: setOpenCreatTechnical,
            //   set: setFields,
            // }}
            sx={{
              height: "450px",
            }}
            toolbar={
              <Button
                type="button"
                size="small"
                color={"blue"}
                disabled={convert_payment_button}
                onClick={() => convertRequestsPendingPaymentS()}
                startIcon={
                  convert_payment_button ? (
                    <ScheduleIcon color="warning" />
                  ) : (
                    <PaidIcon color={"blue"} />
                  )
                }
              >
                {"pendiente pago"}
              </Button>
            }
          />
        </Grid>
      </Grid>
      {/* <DialogForm
        title={"Actualizar Inventario"}
        open={CreatTechnical}
        setOpen={setOpenCreatTechnical}
        button={{
          type: "submit",
          label: "Actualizar",
          onSubmit: handleUpdateinventoryTechnical,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles de solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Tecnico"}
                  type={"text"}
                  value={idusers}
                  setValue={setIdusers}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  ignore={["NO-DESPACHADO", "DESPACHADO"]}
                  ignoreItems={
                    idservice_states === 6
                      ? [
                          "FINALIZADO",
                          "PENDIENTE",
                          "ACEPTADO",
                          "RECHAZADO",
                          "ENVIADO",
                        ]
                      : idservice_states === 5
                      ? [
                          "FINALIZADO",
                          "EN-PROCESO",
                          "PENDIENTE",
                          "ACEPTADO",
                          "RECHAZADO",
                        ]
                      : idservice_states === 7
                      ? [
                          "FINALIZADO",
                          "PENDIENTE",
                          "ACEPTADO",
                          "RECHAZADO",
                          "ENVIADO",
                          "EN-PROCESO",
                        ]
                      : []
                  }
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="blue" label={"Información del repuesto"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Repuesto"}
                  type={"text"}
                  value={idspare_parts}
                  setValue={setIdspare_parts}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos"}
                  type={"number"}
                  value={technical_inventory_amount}
                  setValue={setTechnical_inventory_amount}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos usados"}
                  type={"number"}
                  value={technical_inventory_quantity_used}
                  setValue={setTechnical_inventory_quantity_used}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos disponibles"}
                  type={"number"}
                  value={technical_inventory_quantity_available}
                  setValue={setTechnical_inventory_quantity_available}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Información de solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextFieldFilled
                  label={"Descripción"}
                  type={"number"}
                  value={technical_inventory_description}
                  setValue={setTechnical_inventory_description}
                  readOnly
                />
              </Grid>
            </Grid>
          </Container>
        }
      /> */}
    </Box>
  );
}

export default ServicePayments;
