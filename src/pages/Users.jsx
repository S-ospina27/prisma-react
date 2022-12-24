import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import FaceIcon from "@mui/icons-material/Face";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UsersSelect from "../components/common/UsersSelect";
import axios from "axios";
import RolesSelect from "../components/common/RolesSelect";
import DocumentTypesSelect from "../components/common/DocumentTypesSelect";

function Users() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [users, setUsers] = useState([]);

  const [idusers, setIdusers] = useState("");

  const [idusers_a, setIdusers_a] = useState("");
  const [idroles_a, setIdroles_a] = useState("");
  const [iddocument_types_a, setIddocument_types_a] = useState("");

  const handleReadUsers = () => {
    axios.get("http://127.0.0.1:8000/api/users/read/").then((res) => {
      setUsers(res.data);
    });
  };

  const setFields = (row) => {
    setIdusers_a(
      `${row.idusers} - ${row.fullname}/${row.users_identification}`
    );

    setIdroles_a(row.idroles);
    setIddocument_types_a(row.iddocument_types);
  };

  const hanledRegister = (e) => {
    e.preventDefault();
    console.log(id);
    console.log(name);
    console.log(lastname);
  };

  const hanledUpdate = (e) => {
    e.preventDefault();

    console.log(parseInt(idusers_a.split("-").shift().trim()));
    console.log(idroles_a);
    console.log(iddocument_types_a)
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip
            icon={<PermContactCalendarIcon />}
            label={"Usuarios"}
            color={"primary"}
          />
        </Divider>
      </Box>

      <Box sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }} p={2}>
        <DataTable
          reload={handleReadUsers}
          rows={users}
          columns={[
            { field: "roles_name", headerName: "ROL", width: 250 },
            {
              field: "users_identification",
              headerName: "# DE IDENTIFICACIÓN",
              width: 250,
            },
            { field: "fullname", headerName: "NOMBRE COMPLETO", width: 250 },
            { field: "users_phone", headerName: "TELEFONO", width: 250 },
            { field: "users_email", headerName: "EMAIL", width: 250 },
            { field: "users_address", headerName: "DIRECCIÓN", width: 250 },
            { field: "cities_name", headerName: "CIUDAD", width: 250 },
            {
              field: "departments_name",
              headerName: "DEPARTAMENTO",
              width: 250,
            },
            {
              field: "users_contact_name",
              headerName: "NOMBRE DE CONTACTO",
              width: 250,
            },
            {
              field: "users_contact_phone",
              headerName: "# DE CONTACTO",
              width: 250,
            },
            { field: "status_type", headerName: "STATUS", width: 250 },
          ]}
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
              onClick={() => setOpenRegister(true)}
              color={"primary"}
              startIcon={<FaceIcon color={"primary"} />}
            >
              {"Registrar Usuario"}
            </Button>
          }
        />
        {/* --------------------------------------DIALOG REGISTER ------------------------------------------------------------------------------- */}
        <Dialog
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Box>
              <Divider>
                <Chip
                  icon={<AccountBoxIcon />}
                  label={"Registrar Usuario"}
                  color={"primary"}
                />
              </Divider>
            </Box>
          </DialogTitle>

          <form onSubmit={hanledRegister}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Id rol"
                    variant="filled"
                    type="number"
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  Tipos documento
                  {/* <Selection
                    props={documents}
                    title={"Seleccione tipo de Documento"}
                  /> */}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="N° de  Identificación"
                    variant="filled"
                    type="number"
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombres"
                    variant="filled"
                    type="text"
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    variant="filled"
                    type="number"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  Ciudades
                  {/* <Selection props={cities} title={"Seleccione una ciudad"} /> */}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    type="email"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    variant="filled"
                    type="password"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Contacto"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Contacto"
                    variant="filled"
                    type="number"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenRegister(false)}>Cancelar</Button>
              <Button type="submit">Actualizar</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* --------------------------------------DIALOG UPDATE ------------------------------------------------------------------------------- */}
        <Dialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Box>
              <Divider>
                <Chip
                  icon={<ManageAccountsIcon />}
                  label={"Actualizar usuario"}
                  color={"primary"}
                />
              </Divider>
            </Box>
          </DialogTitle>

          <form onSubmit={hanledUpdate}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <UsersSelect
                    value={idusers_a}
                    setValue={setIdusers_a}
                    required
                    selected={["ADMINISTRADOR", "DISTRIBUIDOR", "TECNICO"]}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <RolesSelect
                    value={idroles_a}
                    setValue={setIdroles_a}
                    required
                    ignore={idroles_a === 1 ? [] : ["ADMINISTRADOR"]}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <DocumentTypesSelect
                    value={iddocument_types_a}
                    setValue={setIddocument_types_a}
                    required
                    ignore={["NIT"]}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  tipos documento
                  {/* <Selection
                    props={documents}
                    title={"Seleccione tipo de Documento"}
                  /> */}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="N° de  Identificación"
                    variant="filled"
                    type="number"
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombres"
                    variant="filled"
                    type="text"
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    variant="filled"
                    type="number"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  Ciudades
                  {/* <Selection props={cities} title={"Seleccione una ciudad"} /> */}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    type="email"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    variant="filled"
                    type="password"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Contacto"
                    variant="filled"
                    type="text"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Contacto"
                    variant="filled"
                    type="number"
                    // value={lastname}
                    // onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenUpdate(false)}>Cancelar</Button>
              <Button type="submit">Actualizar</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      </Box>
    </Box>
  );
}

export default Users;
