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
import FaceIcon from '@mui/icons-material/Face';

function Users() {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [users_list, setUsers_list] = useState([
    {
      id: 1,
      name: "Sergio",
      lastname: "Leon",
    },
    {
      id: 2,
      name: "Santiago",
      lastname: "Ospina",
    },
  ]);

  const handleReadUsers = () => {
    console.log("reading");
  };

  const setFields = (row) => {
    setid(row.id);
    setname(row.name);
    setlastname(row.lastname);
  };

  const hanledUpdate = (e) => {
    e.preventDefault();
    console.log(id);
    console.log(name);
    console.log(lastname);
  };

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip icon={<FaceIcon />} label={"Usuarios"} />
        </Divider>
      </Box>

      <Box sx={{ borderRadius: 1, border: 1 }} p={2}>
        <DataTable
          reload={handleReadUsers}
          rows={users_list}
          columns={[
            { field: "id", headerName: "ID", width: 250 },
            { field: "name", headerName: "NOMBRES", width: 250 },
            { field: "lastname", headerName: "APELLIDOS", width: 250 },
          ]}
          onRowClick={{
            open: setOpen,
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
              onClick={() => setOpen(true)}
              color={"primary"}
              // startIcon={<DomainAddIcon color={"blue-quinary"} />}
            >
              {"Registrar Usuario"}
            </Button>
          }
        />

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <h2>Registrar usuario</h2>
          </DialogTitle>

          <form onSubmit={hanledUpdate}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Nombres"
                    variant="filled"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    variant="filled"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit">Actualizar</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Users;
