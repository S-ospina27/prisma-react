import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MenuItems from "../components/common/MenuItems";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogForm from "../components/common/DialogForm";
import ProductsSelect from "../components/common/ProductsSelect";
import UsersSelect from "../components/common/UsersSelect";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";
import OrderTypeSelect from "../components/common/OrderTypeSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";
import axios from "axios";
import RoutesList from "../components/tools/RoutesList";
import DataTable from "../components/DataTable";
import ColumnsTable from "../components/tools/ColumnsTable";

function ServiceOrders() {
  const [openCreateOrders, setOpenCreateOrders] = useState(false);
  const [openUpdateOrders, setOpenUpdateOrders] = useState(false);
  const [ordersService, setOrderService] = useState([]);

  const [idproducts, setIdproducts] = useState("");
  const [idusers, setIdusers] = useState("");
  const [idservice_states, setIdservice_states] = useState("");
  const [service_orders_type, setService_orders_type] = useState("");
  const [service_orders_amount, setService_orders_amount] = useState("");
  const [service_orders_total_price, setService_orders_total_price] =useState("");

  const[service_orders_defective_amount,setService_orders_defective_amount]=useState("");
  const[service_orders_observation,setService_orders_observation]=useState("");
  const[service_orders_pending_amount,setService_orders_pending_amount]=useState("");


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
    }
  ) => {
    setIdproducts(row.idproducts);
    setIdusers(row.idusers);
    setService_orders_type(row.service_orders_type);
    setService_orders_amount(row.service_orders_amount);
    setService_orders_total_price(row.service_orders_total_price);
    setIdservice_states(row.idservice_states);
  };

  const handleReadOrderService = () => {
    axios.get(RoutesList.api.service_orders.read.index).then((res) => {
      console.log(res.data);
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

    axios.post(RoutesList.api.service_orders.create, form).then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        setOpenCreateOrders(false);
        handleReadOrderService();
      }
    });
  };

  useEffect(() => {
    handleReadOrderService();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
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

              {/* <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  // ignore={['ACEPTADO', 'RECHAZADO', 'PENDIENTE', 'EN-PROCESO', 'ENVIADO']} // administrador
                  // ignore={['NO-DESPACHADO', 'DESPACHADO', 'FINALIZADO']} // proveedor
                />
              </Grid> */}
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
            </Grid>
          </Container>
        }
      />
      <DialogForm
        title={"Actualizar Ordenes de Servicio"}
        open={openUpdateOrders}
        setOpen={setOpenUpdateOrders}
        button={{
          type: "submit",
          label: "Actualizar",
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
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  // ignore={['ACEPTADO', 'RECHAZADO', 'PENDIENTE', 'EN-PROCESO', 'ENVIADO']} // administrador
                  // ignore={['NO-DESPACHADO', 'DESPACHADO', 'FINALIZADO']} // proveedor
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
                  label={"Cantidad Malas"}
                  type={"number"}
                  value={service_orders_defective_amount}
                  setValue={setService_orders_defective_amount}
                />
                </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad Pendientes"}
                  type={"number"}
                  value={service_orders_pending_amount}
                  setValue={setService_orders_pending_amount}
                />

              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Observación"}
                  type={"text"}
                  value={service_orders_observation}
                  setValue={setService_orders_observation}
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
            </Grid>
          </Container>
        }
      />
    </Box>
  );
}

export default ServiceOrders;
