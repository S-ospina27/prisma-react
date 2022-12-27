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
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import TextFieldFilled from "../components/common/TextFieldFilled";
import ProductsTypeSelect from "../components/common/ProductsTypeSelect";
import StatusSelect from "../components/common/StatusSelect";
import DialogForm from "../components/common/DialogForm";
import CloseModal from "../components/common/CloseModal";

import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TextFieldFile from "../components/common/TextFieldFile";

function Products() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openTypeRegister, setOpenTypeRegister] = useState(false);
  const [products, setproducts] = useState([]);

  const [products_color, setProducts_color] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idproduct_types, setIdproduct_types] = useState("");
  const [products_description, setProducts_description] = useState("");
  const [products_image, setProducts_image] = useState([]);

  const [strFileInputUpdate, setStrFileInputUpdate] = useState("");
  const [products_color_a, setProducts_color_a] = useState("");
  const [products_reference_a, setProducts_reference_a] = useState("");
  const [idproduct_types_a, setIdproduct_types_a] = useState("");
  const [products_description_a, setProducts_description_a] = useState("");
  const [idstatus_a, setIdstatus_a] = useState("");
  const [products_image_a, setProducts_image_a] = useState([]);
  const [strProducts_image_a, setStrProducts_image_a] = useState("");

  const handleReadProducts = () => {
    axios.get(RoutesList.api.products.read).then((res) => {
      setproducts(res.data);
    });
  };

  const setFields = (row) => {
    setProducts_reference_a(row.products_reference);
    setIdproduct_types_a(row.idproduct_types);
    setProducts_description_a(row.products_description);
    setProducts_color_a(row.products_color);
    setIdstatus_a(row.idstatus);
    setProducts_image_a([]);
    setStrProducts_image_a(row.products_image);
  };

  const handleCreateProducts = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("products_color", products_color);
    form.append("products_reference", products_reference);
    form.append("idproduct_types", idproduct_types);
    form.append("products_description", products_description);
    form.append("products_image", products_image[0]);

    axios
      .post(RoutesList.api.products.create, form, {
        header: {
          // 'Authorization': `bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          handleReadProducts();
          console.log("successs");
        }
      });
  };

  const handleUpdateProducts = (e) => {
    e.preventDefault();

    console.log(products_image_a.length);
  };

  useEffect(() => {
    handleReadProducts();
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
          reload={handleReadProducts}
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
          maxWidth={"lg"}
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ background: "#2A8AC2", color: "#FFFFFF" }}
          >
            Registrar Productos
            <CloseModal set={setOpenRegister} />
          </DialogTitle>
          <form onSubmit={handleCreateProducts}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <ProductsTypeSelect
                    value={idproduct_types}
                    setValue={setIdproduct_types}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    label={"Referencia producto"}
                    type={"text"}
                    value={products_reference}
                    setValue={setProducts_reference}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Descripción"}
                    value={products_description}
                    setValue={setProducts_description}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Color"}
                    value={products_color}
                    setValue={setProducts_color}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldFile
                    type={"text"}
                    label={"Subir Archivo"}
                    value={products_image_a}
                    setValue={setProducts_image}
                    required
                    accept={[".jpg", ".png", ".jpeg"]}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  background: "2A8AC2",
                }}
                type="submit"
              >
                Registrar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* --------------------------------------DIALOG UPDATE ------------------------------------------------------------------------------- */}
        <DialogForm
          title={"Editar Productos"}
          open={openUpdate}
          setOpen={setOpenUpdate}
          button={{
            type: "submit",
            label: "Actualizar",
            onSubmit: handleUpdateProducts,
          }}
          content={
            <Box my={3}>
              <Box mb={3}>
                <Divider textAlign="left">
                  <Chip label={"Detalles de Producto"} />
                </Divider>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <ProductsTypeSelect
                    value={idproduct_types_a}
                    setValue={setIdproduct_types_a}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <StatusSelect
                    value={idstatus_a}
                    setValue={setIdstatus_a}
                    required
                  />
                </Grid>
              </Grid>

              <Box my={3}>
                <Divider textAlign="left">
                  <Chip label={"Información de Producto"} />
                </Divider>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Referencia"}
                    value={products_reference_a}
                    setValue={setProducts_reference_a}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Descripción"}
                    value={products_description_a}
                    setValue={setProducts_description_a}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Color"}
                    value={products_color_a}
                    setValue={setProducts_color_a}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <TextFieldFile
                    type={"text"}
                    label={"Subir Archivo"}
                    value={products_image_a}
                    setValue={setProducts_image_a}
                    required
                    accept={[".jpg", ".png", ".jpeg"]}
                  />
                </Grid>
              </Grid>

              <Box my={3}>
                <Divider textAlign="left">
                  <Chip label={"Archivos Cargados"} />
                </Divider>
              </Box>

              <Grid container>
                <Grid item xs={12}>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() =>
                      window.open(
                        `${RoutesList.host}/assets/img/products/${strProducts_image_a}`
                      )
                    }
                  >
                    {strProducts_image_a}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          }
        />
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
