import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import DialogForm from "../../common/DialogForm";
import DocumentTypesSelect from "../../common/DocumentTypesSelect";
import LocationsSelect from "../../common/LocationsSelect";
import RolesSelect from "../../common/RolesSelect";
import StatusSelect from "../../common/StatusSelect";
import TextFieldFilled from "../../common/TextFieldFilled";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormCreateUsers({ openRegister, setOpenRegister, alert, loading }) {
  const [idusers, setIdusers] = useState("");
  const [idroles, setIdroles] = useState("");
  const [iddocument_types, setIddocument_types] = useState("");
  const [users_identification, setUsers_identification] = useState("");
  const [users_name, setUsers_name] = useState("");
  const [users_lastname, setUsers_lastname] = useState("");
  const [users_phone, setUsers_phone] = useState("");
  const [users_address, setUsers_address] = useState("");
  const [iddepartments, setIddepartments] = useState("");
  const [idcities, setIdcities] = useState("");
  const [users_email, setUsers_email] = useState("");
  const [users_password, setUsers_password] = useState("");
  const [users_contact_name, setUsers_contact_name] = useState("");
  const [users_contact_phone, setUsers_contact_phone] = useState("");
  const [idstatus, setIdstatus] = useState(1);

  const setRow = (
    row = {
      idusers: "",
      idroles: "",
      iddocument_types: "",
      users_identification: "",
      users_name: "",
      users_lastname: "",
      users_phone: "",
      users_address: "",
      iddepartments: "",
      departments_name: "",
      idcities: "",
      cities_name: "",
      users_email: "",
      users_contact_name: "",
      users_contact_phone: "",
      idstatus: 1,
      users_password: "",
    }
  ) => {
    setIdusers(row.idusers);
    setIdroles(row.idroles);
    setIddocument_types(row.iddocument_types);
    setUsers_identification(row.users_identification);
    setUsers_name(row.users_name);
    setUsers_lastname(row.users_lastname);
    setUsers_phone(row.users_phone);
    setUsers_address(row.users_address);
    setIddepartments(
      row.iddepartments === ""
        ? ""
        : `${row.iddepartments} - ${row.departments_name}`
    );
    setIdcities(
      row.idcities === "" ? "" : `${row.idcities} - ${row.cities_name}`
    );
    setUsers_email(row.users_email);
    setUsers_contact_name(
      row.users_contact_name === null ? "" : row.users_contact_name
    );
    setUsers_contact_phone(
      row.users_contact_phone === null ? "" : row.users_contact_phone
    );
    setIdstatus(row.idstatus);
    setUsers_password(
      ![undefined].includes(row.users_password) ? row.users_password : ""
    );
  };

  const handleCreateUsers = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("idroles", idroles);
    form.append("iddocument_types", iddocument_types);
    form.append("users_identification", users_identification);
    form.append("users_name", users_name);
    form.append("users_lastname", users_lastname);
    form.append("users_phone", users_phone);
    form.append("users_address", users_address);
    form.append("idcities", idcities.split("-").shift().trim());
    form.append("users_email", users_email);
    form.append("users_password", SHA256(users_password));
    form.append("users_contact_name", users_contact_name);
    form.append("users_contact_phone", users_contact_phone);

    axios.post(RoutesList.api.users.create, form, getHeader()).then((res) => {
      // console.log(res.data);

      alert({
        open: true,
        message: res.data.message,
        severity: res.data.status,
      });
      loading(false);

      if (res.data.status === "success") {
        setOpenRegister(false);
      }
    });
  };

  return (
    <DialogForm
      title={"Registrar Usuarios"}
      clean={setRow}
      open={openRegister}
      setOpen={setOpenRegister}
      button={{
        label: "Crear",
        type: "submit",
        onSubmit: handleCreateUsers,
      }}
      content={
        <Container>
          <Box mb={3}>
            <Divider textAlign="left">
              <Chip color="dark-blue" label="Detalles de Usuario" />
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <RolesSelect value={idroles} setValue={setIdroles} required />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <StatusSelect
                value={idstatus}
                setValue={setIdstatus}
                required
                readOnly
              />
            </Grid>
          </Grid>

          <Box my={3}>
            <Divider textAlign="left">
              <Chip color="blue" label="Información de Usuario" />
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <DocumentTypesSelect
                value={iddocument_types}
                setValue={setIddocument_types}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"number"}
                label={"Identificación"}
                value={users_identification}
                setValue={setUsers_identification}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"text"}
                label={"Nombres"}
                value={users_name}
                setValue={setUsers_name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"text"}
                label={"Apellidos"}
                value={users_lastname}
                setValue={setUsers_lastname}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"number"}
                label={"Télefono"}
                value={users_phone}
                setValue={setUsers_phone}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"text"}
                label={"Correo"}
                value={users_email}
                setValue={setUsers_email}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"password"}
                label={"Contraseña"}
                value={users_password}
                setValue={setUsers_password}
                required
              />
            </Grid>
          </Grid>

          <Box my={3}>
            <Divider textAlign="left">
              <Chip color="dark-blue" label="Ubicación de Usuario" />
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <LocationsSelect
                department={iddepartments}
                setDepartment={setIddepartments}
                requiredDepartment={true}
                city={idcities}
                setCity={setIdcities}
                requiredCity={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"text"}
                label={"Dirección"}
                value={users_address}
                setValue={setUsers_address}
                required
              />
            </Grid>
          </Grid>

          <Box my={3}>
            <Divider textAlign="left">
              <Chip color="blue" label="Información de Contacto" />
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"text"}
                label={"Nombre"}
                value={users_contact_name}
                setValue={setUsers_contact_name}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"number"}
                label={"Télefono"}
                value={users_contact_phone}
                setValue={setUsers_contact_phone}
              />
            </Grid>
          </Grid>
        </Container>
      }
    />
  );
}

export default FormCreateUsers;
