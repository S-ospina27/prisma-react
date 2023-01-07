import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import MenuItems from "../components/common/MenuItems";
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
import logo from "./../assets/img/prisma.png";

function ServiceRequest({ loading, alert }) {
  const [serviceRequest, setServiceRequest] = useState([]);
  const [open, setOpen] = useState(false);
  const [fullnamedealers, setFullnamedealers] = useState("");

  const [fullnametechnical, setFullnametechnical] = useState("");

  const [cities_name, setCities_name] = useState("");
  const [product_types_name, setProduct_types_name] = useState("");
  const [products_reference, setProducts_reference] = useState("");

  const [service_type, setService_type] = useState("");

  const [service_request_creation_date, setService_request_creation_date] =
    useState("");
  const [service_request_date_close, setService_request_date_close] =
    useState("");
  const [service_request_client_name, setService_request_client_name] =
    useState("");
  const [service_request_address, setService_request_address] = useState("");
  const [service_request_neighborhood, setService_request_neighborhood] =
    useState("");
  const [service_request_phone_contact, setService_request_phone_contact] =
    useState("");
  const [service_request_email, setService_request_email] = useState("");
  const [service_request_trouble_report, setService_request_trouble_report] =
    useState("");
  const [service_request_evidence, setService_request_evidence] = useState("");
  const [service_request_warranty, setService_request_warranty] = useState("");
  const [service_request_date_visit, setService_request_date_visit] =
    useState("");

  const setFields = (row = {
  }) => {
    setFullnamedealers(row.fullnamedealers);
    setCities_name(row.cities_name);
    setProduct_types_name(row.product_types_name);
    setProducts_reference(row.products_reference);
    setService_request_creation_date(row.service_request_creation_date);
    setService_request_date_close(row.service_request_date_close);
    setService_request_client_name(row.service_request_client_name);
    setService_request_address(row.service_request_address);
    setService_request_neighborhood(row.service_request_neighborhood);
    setService_request_phone_contact(row.service_request_phone_contact);
    setService_request_email(row.service_request_email);
    setService_request_trouble_report(row.service_request_trouble_report);
    setService_request_evidence(row.service_request_evidence);
    setService_request_warranty(row.service_request_warranty);
    setService_request_date_visit(row.service_request_date_visit);
    console.log(row)

  };

  const handleReadServiceRequest = () => {
    axios.get(RoutesList.api.service_request.read).then((res) => {
    //   console.log(res.data);
      setServiceRequest(res.data);
    });
  };

  const handleCreateServiceRequest = (e) => {
    e.preventDefault();
    setOpenCreateOrders(false);
    loading(true);

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

      alert({
        open: true,
        severity: res.data.status,
        message: res.data.message,
      });
      handleReadOrderService();
      setOpenCreateOrders(false);
      loading(false);
    });
  };

  const handleUpdateServiceOrders = (e) => {
    e.preventDefault();
    setOpenUpdateOrders(false);
    loading(true);

    const form = new FormData();
    form.append("idservice_orders", idservice_orders);
    form.append("idproducts", idproducts.split("-").shift().trim());
    form.append("idservice_states", idservice_states);
    form.append("idusers", idusers.split("-").shift().trim());
    form.append(
      "service_orders_date_delivery",
      service_orders_date_delivery === null ? "" : service_orders_date_delivery
    );
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
      alert({
        open: true,
        severity: res.data.status,
        message: res.data.message,
      });
      handleReadOrderService();
      loading(false);
    });
  };

  const handleExportServiceOrders = (e) => {
    e.preventDefault();
    setOpenOrdersDate(false);
    loading(true);

    if ([null, ""].includes(date_start)) {
      setOpenOrdersDate(true);
      loading(false);
      alert({
        open: true,
        severity: "error",
        message: "La fecha inicio es requerida",
      });
      return false;
    }

    if ([null, ""].includes(date_end)) {
      setOpenOrdersDate(true);
      loading(false);
      alert({
        open: true,
        severity: "error",
        message: "La fecha fin es requerida",
      });
      return false;
    }

    const form = new FormData();
    form.append("date_start", dayjs(date_start).format("YYYY-MM-DD"));
    form.append("date_end", dayjs(date_end).format("YYYY-MM-DD"));

    axios.post(RoutesList.api.service_orders.export, form).then((res) => {
      // console.log(res.data);
      loading(false);
      alert({
        open: true,
        severity: res.data.status,
        message: res.data.message,
      });

      if (res.data.status === "success") {
        window.location.href = res.data.data.url;
        setDate_start(null);
        setDate_end(null);
      } else if (res.data.status === "warning") {
        loading(true);
        setTimeout(() => {
          setOpenOrdersDate(true);
          loading(false);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    handleReadServiceRequest();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="dark-blue" label={"Solucitudes"} />
        </Divider>
      </Box>
      {/*   
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
   */}
      <DataTable
        reload={handleReadServiceRequest}
        rows={serviceRequest}
        columns={ColumnsTable.service_request}
        getRowId={"idservice_request"}
        onRowClick={{
          open: setOpen,
          set: setFields,
        }}
        sx={{
          height: "450px",
        }}
      />

      <DialogForm
        title={"Editar Solicitudes"}
        open={open}
        setOpen={setOpen}
        button={{
          type: "submit",
          label: "Actualizar",
          // onSubmit: handleUpdateServiceOrders,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles de ordenes de Solicitudes"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/* <ProductsSelect
                    value={idproducts}
                    setValue={setIdproducts}
                    selected={["ACTIVO"]}
                    required
                  /> */}
              </Grid>
            </Grid>
          </Container>
        }
      />
      {/*   
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
              <Button type="submit" variant="contained" color="blue" size="small">
                Exportar
              </Button>
            </DialogActions>
          </form>
        </Dialog> */}
    </Box>
  );
}

export default ServiceRequest;
