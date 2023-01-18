import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import { useState } from "react";
import LocationsSelect from "../components/common/LocationsSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";

function ApplicationOrderForm({ loading, alert }) {
  const [iddepartments, setIddepartments] = useState("");
  const [idcities, setIdcities] = useState("");
  const [service_request_client_name, setService_request_client_name] =
    useState("");
  const [service_request_neighborhood, setService_request_neighborhood] =
    useState("");
  const [service_request_address, setService_request_address] = useState("");
  const [service_request_phone_contact, setService_request_phone_contact] =
    useState("");
  const [service_request_email, setService_request_email] = useState("");

  const handleCreateServiceRequest = (e) => {
    e.preventDefault();
    loading(true);
  };

  return (
    <Box my={5}>
      <Container>
        <form onSubmit={handleCreateServiceRequest}>
          <Box mb={2}>
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
                readOnly
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
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Dirección"}
                type={"text"}
                value={service_request_address}
                setValue={setService_request_address}
                required
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Teléfono"}
                type={"number"}
                value={service_request_phone_contact}
                setValue={setService_request_phone_contact}
                required
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                label={"Correo"}
                type={"email"}
                value={service_request_email}
                setValue={setService_request_email}
                required
                readOnly
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default ApplicationOrderForm;
