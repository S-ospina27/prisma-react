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

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuItems from "../components/common/MenuItems";

function Products() {
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openTypeRegister, setOpenTypeRegister] = useState(false);
  const [products, setproducts] = useState([]);

  const [idusers, setIdusers] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [products_color, setProducts_color] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idproduct_types, setIdproduct_types] = useState("");
  const [products_description, setProducts_description] = useState("");
  const [idstatus, setIdstatus] = useState("");
  const [products_image, setProducts_image] = useState([]);
  const [strProducts_image, setStrProducts_image] = useState("");

  const handleReadProducts = () => {
    axios.get(RoutesList.api.products.read).then((res) => {
      setproducts(res.data);
    });
  };

  const clean_fields = () => {
    setProducts_reference("");
    setIdproduct_types("");
    setProducts_description("");
    setProducts_color("");
    setIdstatus("");
    setProducts_image("");
    setStrProducts_image("");
  };

  const setFields = (row) => {
    console.log(row.idusers);
    setIdusers(row.idusers);
    setIdproducts(row.idproducts);
    setProducts_reference(row.products_reference);
    setIdproduct_types(row.idproduct_types);
    setProducts_description(row.products_description);
    setProducts_color(row.products_color);
    setIdstatus(row.idstatus);
    setProducts_image([]);
    setStrProducts_image(row.products_image);
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
          clean_fields();
          handleReadProducts();
          console.log("successs");
        }
      });
  };
  const handleUpdateProducts = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("idusers", idusers);
    form.append("idproducts", idproducts);
    form.append("products_color", products_color);
    form.append("products_reference", products_reference);
    form.append("idproduct_types", idproduct_types);
    form.append("products_description", products_description);
    form.append("idstatus", idstatus);
    form.append("products_image", products_image[0]);

    axios.post(RoutesList.api.products.update, form, {
        header: {
          // 'Authorization': `bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          clean_fields();
          handleReadProducts();
          console.log("successs actualizado");
        }
      });
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
            color="blue"
          />
        </Divider>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MenuItems
          id={"operations"}
          iconButton={true}
          label={<MoreVertIcon color={"primary"} />}
          items={[
            {
              type: "modal",
              name: "Crear Orden de Servicio",
              icon: <AssignmentIcon color={"primary"} />,
              setOpen:openRegister,
              idroles: [1],
            },
          ]}
        />
      </Box> */}
      <Box sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }} p={2}>
        <DataTable
          reload={handleReadProducts}
          rows={products}
          columns={ColumnsTable.products}
          onRowClick={{
            open: setOpen,
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
        <DialogForm
          clean={clean_fields}
          title={"Registrar Productos"}
          open={openRegister}
          setOpen={setOpenRegister}
          button={{
            type: "submit",
            label: "Registrar",
            onSubmit: handleCreateProducts,
          }}
          content={
            <Container>
              <Box my={3}>
                <Box mb={3}>
                  <Divider textAlign="left">
                    <Chip color="blue" label={"Detalles de Producto"} />
                  </Divider>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <ProductsTypeSelect
                      value={idproduct_types}
                      setValue={setIdproduct_types}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <StatusSelect
                      value={idstatus}
                      setValue={setIdstatus}
                      required
                    />
                  </Grid>
                </Grid>

                <Box my={3}>
                  <Divider textAlign="left">
                    <Chip color="blue" label={"Información de Producto"} />
                  </Divider>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextFieldFilled
                      type={"text"}
                      label={"Referencia"}
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

                  <Grid item xs={12} sm={6} md={6}>
                    <TextFieldFile
                      type={"text"}
                      label={"Subir Archivo"}
                      value={products_image}
                      setValue={setProducts_image}
                      required
                      accept={[".jpg", ".png", ".jpeg"]}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Container>
          }
        />
        {/* --------------------------------------DIALOG UPDATE ------------------------------------------------------------------------------- */}
        <DialogForm
          title={"Editar Productos"}
          open={open}
          setOpen={setOpen}
          button={{
            type: "submit",
            label: "Actualizar",
            onSubmit: handleUpdateProducts,
          }}
          content={
            <Container>
              <Box my={3}>
                <Box mb={3}>
                  <Divider textAlign="left">
                    <Chip color="blue" label={"Detalles de Producto"} />
                  </Divider>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <ProductsTypeSelect
                      value={idproduct_types}
                      setValue={setIdproduct_types}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <StatusSelect
                      value={idstatus}
                      setValue={setIdstatus}
                      required
                    />
                  </Grid>
                </Grid>

                <Box my={3}>
                  <Divider textAlign="left">
                    <Chip color="blue" label={"Información de Producto"} />
                  </Divider>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextFieldFilled
                      type={"text"}
                      label={"Referencia"}
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

                  <Grid item xs={12} sm={6} md={6}>
                    <TextFieldFile
                      type={"text"}
                      label={"Subir Archivo"}
                      value={products_image}
                      setValue={setProducts_image}
                      required
                      accept={[".jpg", ".png", ".jpeg"]}
                    />
                  </Grid>
                </Grid>

                <Box my={3}>
                  <Divider textAlign="left">
                    <Chip color="blue" label={"Archivos Cargados"} />
                  </Divider>
                </Box>

                <Grid container>
                  <Grid item xs={12}>
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() =>
                        window.open(
                          `${RoutesList.host}/assets/img/products/${strProducts_image}`
                        )
                      }
                    >
                      {strProducts_image}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          }
        />
      </Box>
    </Box>
  );
}

export default Products;
