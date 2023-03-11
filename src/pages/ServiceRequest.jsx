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
import UsersSelect from "../components/common/UsersSelect";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";

import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";
import { getHeader } from "../components/tools/SessionSettings";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogTransition from "../components/common/DialogTransition";

function ServiceRequest({ loading, alert }) {
  const [openOrdersDate, setOpenOrdersDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [serviceRequest, setServiceRequest] = useState([]);

  const [date_start, setDate_start] = useState(null);
  const [date_end, setDate_end] = useState(null);
  const [guide, setGuide] = useState("");
  const [idservice_request, setIdservice_request] = useState("");
  const [iddealers, setIdealers] = useState("");
  const [name_dealers, setName_dealers] = useState("");
  const [users_lastname_dealers, setUsers_lastname_dealers] = useState("");
  const [idusers_technical, setIdusers_technical] = useState("");
  const [cities_name, setCities_name] = useState("");
  const [departments_name, setDepartments_name] = useState("");
  const [product_types_name, setProduct_types_name] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idservice_states, setIdservice_states] = useState("");
  const [service_request_creation_date, setService_request_creation_date] =
    useState(null);
  const [service_request_date_close, setService_request_date_close] =
    useState(null);
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
    useState(null);
  const [service_request_payment_methods, setService_request_payment_methods] =
    useState("");
  const [service_request_value, setService_request_value] = useState("");
  const [
    service_request_technical_novelty,
    setService_request_technical_novelty,
  ] = useState("");

  const setFields = (row) => {
    // console.log(row);
    setGuide(row.guide);
    setIdservice_request(row.idservice_request);
    setService_request_payment_methods(
      row.service_request_payment_methods === null
        ? ""
        : row.service_request_payment_methods
    );
    setService_request_value(
      row.service_request_value === null ? "" : row.service_request_value
    );
    setIdservice_request(row.idservice_request);
    setIdusers_technical(
      row.idusers_technical === null
        ? ""
        : `${row.idusers_technical} - ${row.fullnametechnical}`
    );
    setIdealers(row.users_identification);
    setName_dealers(row.users_name);
    setUsers_lastname_dealers(row.users_lastname);
    setDepartments_name(row.departments_name);
    setCities_name(row.cities_name);
    setIdservice_states(row.idservice_states);
    setProduct_types_name(row.product_types_name);
    setProducts_reference(row.products_reference);
    setService_request_creation_date(row.service_request_creation_date);
    setService_request_date_close(row.service_request_date_close);
    setService_request_date_visit(row.service_request_date_visit);
    setService_request_client_name(row.service_request_client_name);
    setService_request_address(row.service_request_address);
    setService_request_neighborhood(row.service_request_neighborhood);
    setService_request_phone_contact(row.service_request_phone_contact);
    setService_request_email(row.service_request_email);
    setService_request_trouble_report(row.service_request_trouble_report);
    setService_request_evidence(row.service_request_evidence);
    setService_request_warranty(
      row.service_request_warranty === null ? "" : row.service_request_warranty
    );
    setService_request_date_visit(row.service_request_date_visit);
    setService_request_value(
      row.service_request_value === null ? "" : row.service_request_value
    );
    setService_request_payment_methods(
      row.service_request_payment_methods === null
        ? ""
        : row.service_request_payment_methods
    );
    setService_request_technical_novelty(
      row.service_request_technical_novelty === null
        ? ""
        : row.service_request_technical_novelty
    );
  };

  const handleReadServiceRequest = () => {
    axios
      .get(RoutesList.api.service.request.read.index, getHeader())
      .then((res) => {
        // console.log(res.data);
        setServiceRequest(!res.data.status ? res.data : []);
      });
  };

  const handleUpdateServiceRequest = (e) => {
    e.preventDefault();
    setOpen(false);
    loading(true);

    const form = new FormData();
    form.append(
      "idusers_technical",
      idusers_technical.split("-").shift().trim()
    );
    form.append(
      "service_request_date_visit",
      dayjs(service_request_date_visit).format("YYYY-MM-DD")
    );
    form.append("idservice_states", idservice_states);
    form.append("idservice_request", idservice_request);
    form.append("service_request_value", service_request_value);
    form.append(
      "service_request_payment_methods",
      service_request_payment_methods
    );
    form.append(
      "service_request_technical_novelty",
      service_request_technical_novelty
    );
    form.append("service_request_email", service_request_email);
    form.append(
      "service_request_trouble_report",
      service_request_trouble_report
    );

    axios
      .post(RoutesList.api.service.request.update, form, getHeader())
      .then((res) => {
        // console.log(res.data);

        alert({
          open: true,
          severity: res.data.status,
          message: res.data.message,
        });
        // handleReadServiceRequest();
        loading(false);
      });
  };

  const handleExportServiceRequestExcel = (e) => {
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

    axios
      .post(RoutesList.api.service.request.export.excel, form, getHeader())
      .then((res) => {
        // console.log(res.data);
        loading(false);
        alert({
          open: true,
          severity: res.data.status,
          message: res.data.message,
        });

        if (res.data.status === "success") {
          window.open(res.data.data.url);
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
          <Chip color="blue" label={"Solucitudes"} />
        </Divider>
      </Box>

      <Container>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
          <MenuItems
            id={"service"}
            iconButton={true}
            label={<MoreVertIcon color={"dark-blue"} />}
            items={[
              {
                type: "modal",
                name: "Exportar Ordenes de solicitud",
                icon: <AssignmentIcon color={"blue"} />,
                setOpen: setOpenOrdersDate,
                idroles: [1],
              },
            ]}
          />
        </Box>

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
      </Container>

      <DialogForm
        title={"Editar Solicitudes"}
        open={open}
        setOpen={setOpen}
        button={{
          type: "submit",
          label: "Actualizar",
          onSubmit: handleUpdateServiceRequest,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Informacion  de solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Guía"}
                  type={"text"}
                  value={guide}
                  setValue={setGuide}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <UsersSelect
                  label={"Tecnicos"}
                  value={idusers_technical}
                  setValue={setIdusers_technical}
                  required
                  selected={["TECNICO"]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Tipo de Producto"}
                  type={"text"}
                  value={product_types_name}
                  setValue={setProduct_types_name}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Producto"}
                  type={"text"}
                  value={products_reference}
                  setValue={setProducts_reference}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  ignore={[
                    "DESPACHADO",
                    "ACEPTADO",
                    "ENVIADO",
                    "NO-DESPACHADO",
                    "PAGO",
                  ]}
                  readOnly={idservice_states === 8 ? true : false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Garantia"}
                  type={"text"}
                  value={service_request_warranty}
                  setValue={setService_request_warranty}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"valor"}
                  type={"number"}
                  value={service_request_value}
                  setValue={setService_request_value}
                  required
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Metodo de pago"}
                  type={"text"}
                  value={service_request_payment_methods}
                  setValue={setService_request_payment_methods}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Informacion del Cliente"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextFieldFilled
                  label={"Nombre del cliente"}
                  type={"text"}
                  value={service_request_client_name}
                  setValue={setService_request_client_name}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Ciudad"}
                  type={"text"}
                  value={cities_name}
                  setValue={setCities_name}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Departamento"}
                  type={"text"}
                  value={departments_name}
                  setValue={setDepartments_name}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Barrio del Cliente"}
                  type={"text"}
                  value={service_request_neighborhood}
                  setValue={setService_request_neighborhood}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Dirección Cliente"}
                  type={"text"}
                  value={service_request_address}
                  setValue={setService_request_address}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Telefono del Cliente"}
                  type={"text"}
                  value={service_request_phone_contact}
                  setValue={setService_request_phone_contact}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Correo del Cliente"}
                  type={"text"}
                  value={service_request_email}
                  setValue={setService_request_email}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="blue" label={"Informacion del Distribidor"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <TextFieldFilled
                  label={"Identificación"}
                  type={"text"}
                  value={iddealers}
                  setValue={setIdealers}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <TextFieldFilled
                  label={"Nombre"}
                  type={"text"}
                  value={name_dealers}
                  setValue={setName_dealers}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <TextFieldFilled
                  label={"Apellido"}
                  type={"text"}
                  value={users_lastname_dealers}
                  setValue={setUsers_lastname_dealers}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Trazabilidad de Solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <DateFieldFilled
                  label={"Fecha de Creación"}
                  type={"text"}
                  value={service_request_creation_date}
                  setValue={setService_request_creation_date}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <DateFieldFilled
                  label={"Fecha de Visita"}
                  value={service_request_date_visit}
                  setValue={setService_request_date_visit}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <DateFieldFilled
                  label={"Fecha de Cierre"}
                  type={"text"}
                  value={service_request_date_close}
                  setValue={setService_request_date_close}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="blue" label={"Novedad de la Solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextFieldFilled
                  label={"reporte del Problema"}
                  type={"text"}
                  value={service_request_trouble_report}
                  setValue={setService_request_trouble_report}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            {idservice_states === 9 && (
              <>
                <Box my={3}>
                  <Divider textAlign="left">
                    <Chip color="dark-blue" label={"Novedad del Tecnico"} />
                  </Divider>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextFieldFilled
                      label={"Novedad tecnico"}
                      type={"text"}
                      value={service_request_technical_novelty}
                      setValue={setService_request_technical_novelty}
                      required
                      readOnly
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {![null, "", undefined].includes(service_request_evidence) && (
                  <>
                    <Box my={3}>
                      <Divider textAlign="left">
                        <Chip color="dark-blue" label={"Evidencia Novedad"} />
                      </Divider>
                    </Box>

                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() =>
                        window.open(
                          `${RoutesList.host}/assets/img/service/request/evidence/${service_request_evidence}`
                        )
                      }
                    >
                      {service_request_evidence}
                    </Button>
                  </>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                {![null, "", undefined].includes(
                  service_request_technical_novelty
                ) && (
                  <>
                    <Box my={3}>
                      <Divider textAlign="left">
                        <Chip color="dark-blue" label={"Evidencia Solución"} />
                      </Divider>
                    </Box>

                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() =>
                        window.open(
                          `${RoutesList.host}/assets/img/service/request/evidence/${service_request_technical_novelty}`
                        )
                      }
                    >
                      {service_request_technical_novelty}
                    </Button>
                  </>
                )}
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
        <form onSubmit={handleExportServiceRequestExcel}>
          <DialogTitle>{'Exportar "Ordenes de Solicitudes"'}</DialogTitle>

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
      </Dialog>
    </Box>
  );
}

export default ServiceRequest;
