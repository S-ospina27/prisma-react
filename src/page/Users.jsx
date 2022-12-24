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
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DataTable from "../Components/DataTable";
import FaceIcon from "@mui/icons-material/Face";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Selection from "../components/Selection";

function Users() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [idrol, setidrol] = useState("");
  const [lastname, setlastname] = useState("");
  const [titleError, settitleError] = useState("");
  const [error, setError] = useState(false);

  const [users_list, setUsers_list] = useState([
    {
      id: 1,
      roles_name: "Sergio",
      lastname: "Leon",
    },
    {
      id: 2,
      roles_name: "Santiago",
      lastname: "Ospina",
    },
  ]);
  const [documents, setdocuments] = useState([
    {
      id: 1,
      name: "Cedula de ciudadania",
    },
    {
      id: 2,
      name: "Pasaporte",
    },
    {
      id: 3,
      name: "Cedula de extranjeria",
    },
  ]);
  const [cities, setcities] = useState([
    {
      id: 1,
      name: "bogota",
    },
    {
      id: 2,
      name: "medellin",
    },
    {
      id: 3,
      name: "girardota",
    },
  ]);
  const [status, setstatus] = useState([
    {
      id: 1,
      name: "Activo",
    },
    {
      id: 2,
      name: "inactivo",
    },
  ]);

  /* --------------------------------------------HANDLERDATA UPDATE OF DIALOG------------------------------------------------------------------------- */

  const handleReadUsers = () => {
    console.log("reading");
  };

  /* --------------------------------------------SETING DATA UPDATE OF DIALOG------------------------------------------------------------------------- */

  const setFields = (row) => {
    setid(row.id);
    setname(row.name);
    setlastname(row.lastname);
  };

  /* ---------------------------------------------------------------------------------------------------------------------------------------------- */

  /* --------------------------------------------HANLED UPDATE DIALOG------------------------------------------------------------------------- */

  const hanledRegister = (e) => {
    e.preventDefault();
    if (idrol.length <= 1) {
      setError(true);
      settitleError("el campo de idrol se encuentra vasio");
    } else {
      setError(false);
      settitleError("");
    }
  };

  /* ---------------------------------------------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------HANLED UPDATE DIALOG------------------------------------------------------------------------- */

  const hanledUpdate = (e) => {
    e.preventDefault();
    console.log(id);
    console.log(name);
    console.log(lastname);
  };

  /* ---------------------------------------------------------------------------------------------------------------------------------------------- */

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
          rows={users_list}
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
          getRowId={"id"}
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
                    error={error}
                    helperText={titleError}
                    value={idrol}
                    onChange={(e) => {
                      setidrol(e.target.value);
                      if (idrol.length >=10){
                        setError(true);
                        settitleError( "El campo Rol solo admite un maximo de 10 digitos")
                      }else{
                        settitleError("")
                        setError(false)
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Selection
                    props={documents}
                    title={"Seleccione tipo de Documento"}
                  />
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
                  <Selection props={cities} title={"Seleccione una ciudad"} />
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
              <Button type="submit">Registrar</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
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
                  <Selection
                    props={status}
                    title={"Seleccione tipo de Status"}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Selection
                    props={documents}
                    title={"Seleccione tipo de Documento"}
                  />
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
                  <Selection props={cities} title={"Seleccione una ciudad"} />
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
