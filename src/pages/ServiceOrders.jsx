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
  const [ordersService, setOrderService] = useState([]);

  const [idproducts, setIdproducts] = useState("");
  const [idusers, setIdusers] = useState("");
  const [idservice_states, setIdservice_states] = useState("");
  const [service_orders_type, setService_orders_type] = useState("");
  const [service_orders_amount, setService_orders_amount] = useState("");
  const [service_orders_total_price, setService_orders_total_price] =
    useState("");

  const setFields = (
    row = {
      idproducts: "",
      idusers: "",
      service_orders_type: "",
      service_orders_amount: "",
      service_orders_total_price: "",
    }
  ) => {
    setIdproducts(row.idproducts);
    setIdusers(row.idusers);
    setService_orders_type(row.service_orders_type);
    setService_orders_amount(row.service_orders_amount);
    setService_orders_total_price(row.service_orders_total_price);
  };

  const handleReadOrderService = () => {
    axios.get(RoutesList.api.service_orders.read.index).then((res) => {
      console.log(res.data)
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
    </Box>
  );
}

export default ServiceOrders;
