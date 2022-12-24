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
import UsersSelect from "../components/common/UsersSelect";
import axios from "axios";
import RolesSelect from "../components/common/RolesSelect";
import DocumentTypesSelect from "../components/common/DocumentTypesSelect";
import LocationsSelect from "../components/common/LocationsSelect";
import RoutesList from "../components/tools/RoutesList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ColumnsTable from "../components/tools/ColumnsTable";

function Products() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [products, setproducts] = useState([]);


  const handleProducts = () => {
    axios.get(RoutesList.api.products.read).then((res) => {
      setproducts(res.data);
    });
  };

  const setFields = (row) => {
 
  };

  const hanledRegister = (e) => {};

  const hanledUpdate = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip
            icon={<WorkOutlineIcon />}
            label={"Portafolio"}
            color={"primary"}
          />
        </Divider>
      </Box>
      <Box sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }} p={2}>
        <DataTable
          reload={handleProducts}
          rows={products}
          columns={ColumnsTable.products}
          onRowClick={{
            open: setOpenUpdate,
            set: setFields,
          }}
          getRowId={"idproducts"}
          sx={{
            height: "450px",
          }}
          toolbar={
            <Button
              type="button"
              size="small"
              onClick={() => setOpenRegister(true)}
              color={"primary"}
              startIcon={<AddHomeWorkIcon color={"primary"} />}
            >
              {"Registrar Producto"}
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
                  icon={<WorkOutlineIcon />}
                  label={"Registrar Usuario"}
                  color={"primary"}
                />
              </Divider>
            </Box>
          </DialogTitle>

          <form onSubmit={hanledRegister}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenRegister(false)}>Cancelar</Button>
              <Button type="submit">Registrar</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* --------------------------------------DIALOG UPDATE ------------------------------------------------------------------------------- */}
        <Dialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          aria-labelledby="responsive-dialog-title"
          maxWidth={"lg"}
        >
          <DialogTitle id="responsive-dialog-title">
            <Box>
              <Divider>
                <Chip
                  icon={<WorkHistoryIcon />}
                  label={"Actualizar Productos"}
                  color={"primary"}
                />
              </Divider>
            </Box>
          </DialogTitle>

          <form onSubmit={hanledUpdate}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>

                <Grid item xs={12} sm={6} md={6}></Grid>
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

export default Products;
