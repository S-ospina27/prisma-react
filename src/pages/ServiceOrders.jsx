import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuItems from "../components/common/MenuItems";
import axios from "axios";
import DateFieldFilled from "../components/common/DateFieldFilled";
import DataTable from "../components/DataTable";
import DialogForm from "../components/common/DialogForm";
import ProductsSelect from "../components/common/ProductsSelect";
import UsersSelect from "../components/common/UsersSelect";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";
import OrderTypeSelect from "../components/common/OrderTypeSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";

import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogTransition from "../components/common/DialogTransition";

function ServiceOrders() {
  const [openCreateOrders, setOpenCreateOrders] = useState(false);
  const [openUpdateOrders, setOpenUpdateOrders] = useState(false);
  const [openOrdersDate, setOpenOrdersDate] = useState(false);
  const [ordersService, setOrderService] = useState([]);

  const [idservice_orders, setIdservice_orders] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [idservice_states, setIdservice_states] = useState("");
  const [idusers, setIdusers] = useState("");
  const [service_orders_creation_date, setService_orders_creation_date] =
    useState(null);
  const [service_orders_date_delivery, setService_orders_date_delivery] =
    useState(null);
  const [service_orders_finished_product, setService_orders_finished_product] =
    useState("");
  const [service_orders_type, setService_orders_type] = useState("");
  const [service_orders_consecutive, setService_orders_consecutive] =
    useState("");
  const [service_orders_amount, setService_orders_amount] = useState("");
  const [
    service_orders_not_defective_amount,
    setService_orders_not_defective_amount,
  ] = useState("");
  const [service_orders_defective_amount, setService_orders_defective_amount] =
    useState("");
  const [service_orders_observation, setService_orders_observation] =
    useState("");
  const [service_orders_total_price, setService_orders_total_price] =
    useState("");
  const [service_orders_pending_amount, setService_orders_pending_amount] =
    useState("");
  const [full_consecutive, setFull_consecutive] = useState("");
  const [date_start, setDate_start] = useState(null);
  const [date_end, setDate_end] = useState(null);

  const setFields = (
    row = {
      idproducts: "",
      idusers: "",
      service_orders_type: "",
      service_orders_amount: "",
      service_orders_total_price: "",
      service_orders_defective_amount: "",
      service_orders_observation: "",
      service_orders_pending_amount: "",
      service_orders_date_delivery: "",
      service_orders_finished_product: "",
      service_orders_not_defective_amount: "",
      service_orders_creation_date: null,
      full_consecutive: "",
    }
  ) => {
    setIdservice_orders(row.idservice_orders);
    setIdproducts(
      row.idproducts === ""
        ? ""
        : `${row.idproducts} - ${row.products_reference}`
    );
    setIdusers(row.idusers === "" ? "" : `${row.idusers} - ${row.fullname}`);
    setService_orders_type(row.service_orders_type);
    setService_orders_amount(row.service_orders_amount);
    setService_orders_total_price(row.service_orders_total_price);
    setIdservice_states(row.idservice_states);
    setService_orders_creation_date(row.service_orders_creation_date);
    setService_orders_date_delivery(row.service_orders_date_delivery);
    setService_orders_finished_product(row.service_orders_finished_product);
    setService_orders_consecutive(row.service_orders_consecutive);
    setService_orders_not_defective_amount(
      row.service_orders_not_defective_amount === null
        ? ""
        : row.service_orders_not_defective_amount
    );
    setFull_consecutive(row.full_consecutive);
  };

  const handleReadOrderService = () => {
    axios.get(RoutesList.api.service_orders.read.index).then((res) => {
      // console.log(res.data);
      setOrderService(res.data);
    });
  };

  const handleCreateServiceOrders = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("idproducts", idproducts);
    form.append("idusers", idusers);
    form.append("service_orders_type", service_orders_type);
    form.append("service_orders_amount", service_orders_amount);
    form.append("service_orders_total_price", service_orders_total_price);
    form.append(
      "service_orders_finished_product",
      service_orders_finished_product
    );

    axios.post(RoutesList.api.service_orders.create, form).then((res) => {
      // console.log(res.data);
      setOpenCreateOrders(false);
      handleReadOrderService();
    });
  };

  const handleUpdateServiceOrders = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("idservice_orders", idservice_orders);
    form.append("idproducts", idproducts.split("-").shift().trim());
    form.append("idservice_states", idservice_states);
    form.append("idusers", idusers.split("-").shift().trim());
    form.append("service_orders_creation_date", service_orders_creation_date);
    form.append("service_orders_date_delivery", service_orders_date_delivery);
    form.append(
      "service_orders_finished_product",
      service_orders_finished_product
    );
    form.append("service_orders_type", service_orders_type);
    form.append("service_orders_consecutive", service_orders_consecutive);
    form.append("service_orders_amount", service_orders_amount);
    form.append(
      "service_orders_not_defective_amount",
      service_orders_not_defective_amount
    );
    form.append(
      "service_orders_defective_amount",
      service_orders_defective_amount
    );
    form.append("service_orders_observation", service_orders_observation);
    form.append("service_orders_total_price", service_orders_total_price);
    form.append("service_orders_pending_amount", service_orders_pending_amount);

    axios.post(RoutesList.api.service_orders.update, form).then((res) => {
      // console.log(res.data);
      handleReadOrderService();
      setOpenUpdateOrders(false);
    });
  };

  const handleExportServiceOrders = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  useEffect(() => {
    handleReadOrderService();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="blue" label={"Ordenes de Servicio"} />
        </Divider>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MenuItems
          id={"operations"}
          iconButton={true}
          label={<MoreVertIcon color={"dark-blue"} />}
          items={[
            {
              type: "modal",
              name: "Crear Orden de Servicio",
              icon: <AssignmentIcon color={"dark-blue"} />,
              setOpen: setOpenCreateOrders,
              idroles: [1],
            },
            {
              type: "modal",
              name: "Exportar Ordenes de Servicio",
              icon: <AssignmentIcon color={"blue"} />,
              setOpen: setOpenOrdersDate,
              idroles: [1],
            },
          ]}
        />
      </Box>

      <DataTable
        reload={handleReadOrderService}
        rows={ordersService}
        columns={ColumnsTable.service_order}
        getRowId={"idservice_orders"}
        onRowClick={{
          open: setOpenUpdateOrders,
          set: setFields,
        }}
        sx={{
          height: "450px",
        }}
      />

      <DialogForm
        title={"Registrar Ordenes de Servicio"}
        open={openCreateOrders}
        setOpen={setOpenCreateOrders}
        clean={setFields}
        button={{
          type: "submit",
          label: "Registrar",
          onSubmit: handleCreateServiceOrders,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <ProductsSelect
                  value={idproducts}
                  setValue={setIdproducts}
                  selected={["ACTIVO"]}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <UsersSelect
                  label={"Proveedores"}
                  value={idusers}
                  setValue={setIdusers}
                  required
                  selected={["PROVEEDOR"]}
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="blue" label={"Información Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <OrderTypeSelect
                  value={service_orders_type}
                  setValue={setService_orders_type}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad"}
                  type={"number"}
                  value={service_orders_amount}
                  setValue={setService_orders_amount}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Precio"}
                  type={"number"}
                  value={service_orders_total_price}
                  setValue={setService_orders_total_price}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Producto Final"}
                  type={"text"}
                  value={service_orders_finished_product}
                  setValue={setService_orders_finished_product}
                  required
                />
              </Grid>
            </Grid>
          </Container>
        }
      />

      <DialogForm
        title={"Editar Ordenes de Servicio"}
        open={openUpdateOrders}
        setOpen={setOpenUpdateOrders}
        button={{
          type: "submit",
          label: "Actualizar",
          onSubmit: handleUpdateServiceOrders,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <ProductsSelect
                  value={idproducts}
                  setValue={setIdproducts}
                  selected={["ACTIVO"]}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  ignore={[
                    "ACEPTADO",
                    "RECHAZADO",
                    "PENDIENTE",
                    "EN-PROCESO",
                    "ENVIADO",
                  ]}
                  // ignore={['NO-DESPACHADO', 'DESPACHADO', 'FINALIZADO']} // proveedor
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <UsersSelect
                  label={"Proveedores"}
                  value={idusers}
                  setValue={setIdusers}
                  required
                  selected={["PROVEEDOR"]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <OrderTypeSelect
                  value={service_orders_type}
                  setValue={setService_orders_type}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Consecutivo"}
                  type={"text"}
                  value={full_consecutive}
                  setValue={setFull_consecutive}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="blue" label={"Información Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad Productos"}
                  type={"number"}
                  value={service_orders_amount}
                  setValue={setService_orders_amount}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Precio"}
                  type={"number"}
                  value={service_orders_total_price}
                  setValue={setService_orders_total_price}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Producto Final"}
                  type={"text"}
                  value={service_orders_finished_product}
                  setValue={setService_orders_finished_product}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <DateFieldFilled
                  label={"Fecha de Creación"}
                  value={service_orders_creation_date}
                  setValue={setService_orders_creation_date}
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <DateFieldFilled
                  label={"Fecha de Entrega"}
                  value={service_orders_date_delivery}
                  setValue={setService_orders_date_delivery}
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"producto a Entregar"}
                  type={"text"}
                  value={service_orders_finished_product}
                  setValue={setService_orders_finished_product}
                  required
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Novedades Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad Malas"}
                  type={"number"}
                  value={service_orders_defective_amount}
                  setValue={setService_orders_defective_amount}
                  disabled={idservice_states === 6 ? false : true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad Pendientes"}
                  type={"number"}
                  value={service_orders_pending_amount}
                  setValue={setService_orders_pending_amount}
                  disabled={idservice_states === 6 ? false : true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <TextFieldFilled
                  label={"Observación"}
                  type={"text"}
                  value={service_orders_observation}
                  setValue={setService_orders_observation}
                  disabled={idservice_states === 6 ? false : true}
                />
              </Grid>
            </Grid>
          </Container>
        }
      />

      <Dialog
        open={openOrdersDate}
        onClose={() => setOpenOrdersDate(false)}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={handleExportServiceOrders}>
          <DialogTitle>{'Exportar "Ordenes de Servicio"'}</DialogTitle>

          <DialogContent dividers>
            <Box my={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <DateFieldFilled
                    label={"Fecha Inicio"}
                    value={date_start}
                    setValue={setDate_start}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <DateFieldFilled
                    label={"Fecha Fin"}
                    value={date_end}
                    setValue={setDate_end}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenOrdersDate(false)}>Cancel</Button>
            <Button type="submit">Exportar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default ServiceOrders;
