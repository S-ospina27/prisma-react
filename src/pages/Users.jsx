import { Box, Button, Chip, Container, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import axios from "axios";
import RolesSelect from "../components/common/RolesSelect";
import DocumentTypesSelect from "../components/common/DocumentTypesSelect";
import LocationsSelect from "../components/common/LocationsSelect";
import DialogForm from "../components/common/DialogForm";
import TextFieldFilled from "../components/common/TextFieldFilled";
import StatusSelect from "../components/common/StatusSelect";

import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { SHA256 } from "crypto-js";

function Users() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleReadUsers = () => {
    axios.get(RoutesList.api.users.read.index).then((res) => {
      setUsers(res.data);
    });
  };

  const setFields = (
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
    if (idroles != 3) {
      form.append("users_password", SHA256(users_password));
    }
    form.append("users_contact_name", users_contact_name);
    form.append("users_contact_phone", users_contact_phone);

    axios.post(RoutesList.api.users.create, form).then((res) => {
      // console.log(res.data);

      if (res.data.status === "success") {
        handleReadUsers();
        setOpenRegister(false);
      }
    });
  };

  const handleUpdateUsers = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("idusers", idusers);
    form.append("idroles", idroles);
    form.append("iddocument_types", iddocument_types);
    form.append("users_identification", users_identification);
    form.append("users_name", users_name);
    form.append("users_lastname", users_lastname);
    form.append("users_phone", users_phone);
    form.append("users_address", users_address);
    form.append("idcities", idcities.split("-").shift().trim());
    form.append("users_email", users_email);
    form.append("users_contact_name", users_contact_name);
    form.append("users_contact_phone", users_contact_phone);
    form.append("idstatus", idstatus);

    axios.post(RoutesList.api.users.update, form).then((res) => {
      // console.log(res.data);

      if (res.data.status === "success") {
        handleReadUsers();
        setOpenUpdate(false);
      }
    });
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip color="blue" label={"Usuarios"} />
        </Divider>
      </Box>

      <Box sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }} p={2}>
        <DataTable
          reload={handleReadUsers}
          rows={users}
          columns={ColumnsTable.users}
          onRowClick={{
            open: setOpenUpdate,
            set: setFields,
          }}
          getRowId={"idusers"}
          sx={{
            height: "450px",
          }}
          toolbar={
            <Button
              type="button"
              size="small"
              color={"blue"}
              onClick={() => setOpenRegister(true)}
              startIcon={<PersonAddAltRoundedIcon color={"blue"} />}
            >
              {"Registrar"}
            </Button>
          }
        />

        <DialogForm
          title={"Registrar Usuarios"}
          clean={setFields}
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

              <Grid container spacing={3}>
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

              <Grid container spacing={3}>
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
                    required={idroles === 3 ? false : true}
                  />
                </Grid>
              </Grid>

              <Box my={3}>
                <Divider textAlign="left">
                  <Chip color="dark-blue" label="Ubicación de Usuario" />
                </Divider>
              </Box>

              <Grid container spacing={3}>
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

              <Grid container spacing={3}>
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

        <DialogForm
          title={"Editar Usuarios"}
          open={openUpdate}
          setOpen={setOpenUpdate}
          button={{
            label: "Actualizar",
            type: "submit",
            onSubmit: handleUpdateUsers,
          }}
          content={
            <Container>
              <Box mb={3}>
                <Divider textAlign="left">
                  <Chip color="dark-blue" label="Detalles de Usuario" />
                </Divider>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <RolesSelect value={idroles} setValue={setIdroles} required />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <StatusSelect
                    value={idstatus}
                    setValue={setIdstatus}
                    required
                  />
                </Grid>
              </Grid>

              <Box my={3}>
                <Divider textAlign="left">
                  <Chip color="blue" label="Información de Usuario" />
                </Divider>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <DocumentTypesSelect
                    value={iddocument_types}
                    setValue={setIddocument_types}
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </Grid>
              </Grid>

              <Box my={3}>
                <Divider textAlign="left">
                  <Chip color="dark-blue" label="Ubicación de Usuario" />
                </Divider>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <LocationsSelect
                    department={iddepartments}
                    setDepartment={setIddepartments}
                    requiredDepartment={true}
                    city={idcities}
                    setCity={setIdcities}
                    requiredCity={true}
                    disabledCity={false}
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

              <Grid container spacing={3}>
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
      </Box>
    </Box>
  );
}

export default Users;
