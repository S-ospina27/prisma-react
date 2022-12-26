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
  IconButton,
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
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ColumnsTable from "../components/tools/ColumnsTable";
import TextFieldFilled from "../components/common/TextFieldFilled";
import ProductsTypeSelect from "../components/common/ProductsTypeSelect";
import StatusSelect from "../components/common/StatusSelect";

import DialogForm from "../components/common/DialogForm";
import CloseModal from "../components/common/CloseModal";

function Products() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [products, setproducts] = useState([]);
  const [idproducts, setidproducts] = useState("");
  const [referencia, setreferencia] = useState("");
  const [TypeProducts, setTypeProducts] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [openTypeRegister, setOpenTypeRegister] = useState(false);

  const handleProducts = () => {
    axios.get(RoutesList.api.products.read).then((res) => {
      setproducts(res.data);
    });
  };

  const setFields = (row) => {};

  const handleCreateProducts = (e) => {};

  const handleUpdateProducts = (e) => {
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
            <>
              <Button
                type="button"
                size="small"
                onClick={() => setOpenRegister(true)}
                color={"primary"}
                startIcon={<AddHomeWorkIcon color={"primary"} />}
              >
                {"Registrar Producto"}
              </Button>
              {/* <Button
                type="button"
                size="small"
                onClick={() => setOpenTypeRegister(true)}
                color={"primary"}
                startIcon={<AddHomeWorkIcon color={"primary"} />}
              >
                {"Registrar Tipo Producto"}
              </Button> */}
            </>
          }
        />
        {/* --------------------------------------DIALOG REGISTER ------------------------------------------------------------------------------- */}
        {/* <DialogForm
          title="Registrar Productos"
          open={openRegister}
          set={setOpenRegister}
          button={{
            label: "Registrar",
            type: "submit",
            onSubmit: handleCreateProducts,
          }}
          content={<Container></Container>}
        /> */}

        <Dialog
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ background: "#0B72DE", color: "#FFFFFF" }}
          >
            Registrar Productos
            <CloseModal set={setOpenRegister} />
          </DialogTitle>
          <form onSubmit={handleCreateProducts}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"number"}
                    label={"Id Producto"}
                    value={idproducts}
                    setValue={setidproducts}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Referencia"}
                    value={referencia}
                    setValue={setreferencia}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <ProductsTypeSelect
                    value={TypeProducts}
                    setValue={setTypeProducts}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Descripción"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Color"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"number"}
                    label={"id usuario"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  falta image y se asigna a balsan
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ background: "#0B72DE", color: "#FFFFFF" }}>
              <Button variant={"text"} sx={{ color: "#FFFFFF" }} type="submit">
                Registrar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* --------------------------------------DIALOG UPDATE ------------------------------------------------------------------------------- */}
        {/* <Dialog
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
                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"number"}
                    label={"Id Producto"}
                    value={idproducts}
                    setValue={setidproducts}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Referencia"}
                    value={referencia}
                    setValue={setreferencia}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <ProductsTypeSelect
                    value={TypeProducts}
                    setValue={setTypeProducts}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Descripción"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Color"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <StatusSelect />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  falta image y se asigna a balsan
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenUpdate(false)}>Cancelar</Button>
              <Button type="submit">Actualizar</Button>
            </DialogActions>
          </form>
        </Dialog> */}
        {/* --------------------------------------DIALOG REGISTER_TYPE ------------------------------------------------------------------------------- */}
        {/* <Dialog
          fullScreen
          open={openTypeRegister}
          onClose={() => setOpenTypeRegister(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Box>
              <Divider>
                <Chip
                  icon={<WorkOutlineIcon />}
                  label={"Registrar"}
                  color={"primary"}
                />
              </Divider>
            </Box>
          </DialogTitle>

          <form onSubmit={hanledRegister}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Color"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"number"}
                    label={"id usuario"}
                    value={descripcion}
                    setValue={setDescripcion}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenTypeRegister(false)}>
                Cancelar
              </Button>
              <Button type="submit">Registrar</Button>
            </DialogActions>
          </form>
        </Dialog> */}
      </Box>
    </Box>
  );
}

export default Products;
