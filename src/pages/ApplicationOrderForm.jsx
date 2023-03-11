import { Box, Button, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationsSelect from "../components/common/LocationsSelect";
import ProductsSelect from "../components/common/ProductsSelect";
import TextFieldFile from "../components/common/TextFieldFile";
import TextFieldFilled from "../components/common/TextFieldFilled";

import RoutesList from "../components/tools/RoutesList";
import {
  getHeader,
  getHeaderMultipart,
} from "../components/tools/SessionSettings";

function ApplicationOrderForm({ loading, alert }) {
  const { idusers } = useParams();
  const navigate = useNavigate();

  const [blocked, setBlocked] = useState(false);

  const [iddepartments, setIddepartments] = useState("");
  const [idcities, setIdcities] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [service_request_client_name, setService_request_client_name] =
    useState("");
  const [service_request_neighborhood, setService_request_neighborhood] =
    useState("");
  const [service_request_address, setService_request_address] = useState("");
  const [service_request_phone_contact, setService_request_phone_contact] =
    useState("");
  const [service_request_email, setService_request_email] = useState("");
  const [service_request_trouble_report, setService_request_trouble_report] =
    useState("");
  const [service_request_evidence, setService_request_evidence] = useState([]);

  const clearFields = () => {
    setIddepartments("");
    setIdcities("");
    setIdproducts("");
    setService_request_client_name("");
    setService_request_neighborhood("");
    setService_request_address("");
    setService_request_phone_contact("");
    setService_request_email("");
    setService_request_trouble_report("");
    setService_request_evidence([]);
  };

  const handleCreateServiceRequest = (e) => {
    e.preventDefault();
    loading(true);
    setBlocked(true);

    const form = new FormData();
    form.append("idusers_dealers", idusers);
    form.append("idcities", idcities.split("-").shift().trim());
    form.append("idproducts", idproducts.split("-").shift().trim());
    form.append("service_request_client_name", service_request_client_name);
    form.append("service_request_neighborhood", service_request_neighborhood);
    form.append("service_request_address", service_request_address);
    form.append("service_request_phone_contact", service_request_phone_contact);
    form.append("service_request_email", service_request_email);
    form.append(
      "service_request_trouble_report",
      service_request_trouble_report
    );
    form.append(
      "service_request_evidence",
      service_request_evidence.length > 0 ? service_request_evidence[0] : []
    );

    axios
      .post(RoutesList.api.application_order_form, form, getHeaderMultipart())
      .then((res) => {
        // console.log(res.data);

        setBlocked(false);
        loading(false);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });

        if (res.data.status === "success") {
          clearFields();
          setTimeout(() => navigate("/"), 5000);
        }
      });
  };

  return (
    <Box my={5}>
      <Container>
        <form onSubmit={handleCreateServiceRequest}>
          <Box mb={3}>
            <Divider textAlign="left">
              <Chip color="dark-blue" label={"Informacion Cliente"} />
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
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <LocationsSelect
                department={iddepartments}
                setDepartment={setIddepartments}
                requiredDepartment={true}
                labelDepartment={"Departamento"}
                city={idcities}
                setCity={setIdcities}
                requiredCity={true}
                labelCity={"Ciudad"}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Barrio"}
                type={"text"}
                value={service_request_neighborhood}
                setValue={setService_request_neighborhood}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Dirección"}
                type={"text"}
                value={service_request_address}
                setValue={setService_request_address}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Teléfono"}
                type={"number"}
                value={service_request_phone_contact}
                setValue={setService_request_phone_contact}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Correo"}
                type={"email"}
                value={service_request_email}
                setValue={setService_request_email}
                required
              />
            </Grid>
          </Grid>

          <Box my={3}>
            <Divider textAlign="left">
              <Chip color="dark-blue" label={"Detalles producto"} />
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <ProductsSelect
                value={idproducts}
                setValue={setIdproducts}
                selected={["ACTIVO"]}
                showColumns={["product_types_name"]}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFile
                type={"text"}
                label={"Subir Archivo"}
                value={service_request_evidence}
                setValue={setService_request_evidence}
                required
                accept={[".jpg", ".png", ".jpeg"]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <TextFieldFilled
                label={"Descripción del problema"}
                type={"text"}
                value={service_request_trouble_report}
                setValue={setService_request_trouble_report}
                required
              />
            </Grid>
          </Grid>

          <Box mt={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="dark-blue"
              disabled={blocked}
            >
              {"Enviar Solicitud"}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default ApplicationOrderForm;
