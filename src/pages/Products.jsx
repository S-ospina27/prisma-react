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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../Components/DataTable";
import TextFieldFilled from "../components/common/TextFieldFilled";
import ProductsTypeSelect from "../components/common/ProductsTypeSelect";
import StatusSelect from "../components/common/StatusSelect";
import DialogForm from "../components/common/DialogForm";
import TextFieldFile from "../components/common/TextFieldFile";
import MenuItems from "../components/common/MenuItems";

import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TextFieldOutlined from "../components/common/TextFieldOutlined";

function Products() {
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openTypeRegister, setOpenTypeRegister] = useState(false);
  const [openTypeUpdate, setOpenTypeUpdate] = useState(false);
  const [products, setproducts] = useState([]);
  const [typeProducts_read, setTypeProducts_read] = useState([]);

  const [idusers, setIdusers] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [products_color, setProducts_color] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idproduct_types, setIdproduct_types] = useState("");
  const [products_description, setProducts_description] = useState("");
  const [idstatus, setIdstatus] = useState("");
  const [products_image, setProducts_image] = useState([]);
  const [strProducts_image, setStrProducts_image] = useState("");

  const [product_types_name, setProduct_types_name] = useState("");

  const handleReadProducts = () => {
    axios.get(RoutesList.api.products.read).then((res) => {
      setproducts(res.data);
    });
  };
  const handleReadTypeProducts = () => {
    axios.get(RoutesList.api.products.types.read).then((res) => {
      setTypeProducts_read(res.data);
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

  const setFieldsProductTypes = (
    row = { product_types_name: "", idproduct_types: "" }
  ) => {
    setProduct_types_name(row.product_types_name);
    setIdproduct_types(row.idproduct_types);
  };

  const handleCreateProducts = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("products_color", products_color);
    form.append("products_reference", products_reference);
    form.append("idproduct_types", idproduct_types);
    form.append("products_description", products_description);
    form.append(
      "products_image",
      products_image.length > 0 ? products_image[0] : []
    );

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
          setOpenRegister(false);
          console.log("successs");
        }
      });
  };

  const handleCreateProductsType = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("product_types_name", product_types_name);
    axios
      .post(RoutesList.api.products.types.create, form, {
        header: {
          // 'Authorization': `bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("successs");
          setFieldsProductTypes();
          setOpenTypeRegister(true);
          handleReadTypeProducts();
        }
      });
  };
  const handleUpdateProductsType = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("product_types_name", product_types_name);
    form.append("idproduct_types", idproduct_types);

    axios
      .post(RoutesList.api.products.types.update, form, {
        header: {
          // 'Authorization': `bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("successs");
          handleClose();
          handleReadTypeProducts();
        }
      });
  };

  const handleClose = () => {
    setOpenTypeUpdate(false);
    setFieldsProductTypes();
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
    form.append(
      "products_image",
      products_image.length > 0 ? products_image[0] : strProducts_image
    );

    axios
      .post(RoutesList.api.products.update, form, {
        header: {
          // 'Authorization': `bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          clean_fields();
          setOpen(false);
          handleReadProducts();
          console.log("successs actualizado");
        }
      });
  };

  useEffect(() => {
    handleReadProducts();
  }, []);
  useEffect(() => {
    handleReadTypeProducts();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip label={"Portafolio"} color="blue" />
        </Divider>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MenuItems
          id={"products"}
          iconButton={true}
          label={<MoreVertIcon color={"dark-blue"} />}
          items={[
            {
              type: "modal",
              name: "Registrar Productos",
              icon: <AddShoppingCartIcon color={"dark-blue"} />,
              setOpen: setOpenRegister,
              idroles: [1],
            },
            {
              type: "modal",
              name: "Tipos de Producto",
              icon: <AddShoppingCartIcon color={"dark-blue"} />,
              setOpen: setOpenTypeRegister,
              idroles: [1],
            },
          ]}
        />
      </Box>

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
        />
      </Box>

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
      {/* --------------------------------------DIALOG REGISTER_TYPE ------------------------------------------------------------------------------- */}
      <DialogForm
        clean={clean_fields}
        title={"Tipos de Producto"}
        open={openTypeRegister}
        setOpen={setOpenTypeRegister}
        button={{
          type: "submit",
          label: "Registrar",
          onSubmit: handleCreateProductsType,
        }}
        content={
          <Container>
            <Box my={3}>
              <Box mb={3}>
                <Divider textAlign="left">
                  <Chip color="blue" label={"Detalles Tipo de Producto"} />
                </Divider>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <TextFieldFilled
                    type={"text"}
                    label={"Nombre "}
                    value={product_types_name}
                    setValue={setProduct_types_name}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                  <DataTable
                    reload={handleReadTypeProducts}
                    rows={typeProducts_read}
                    columns={ColumnsTable.type_products}
                    onRowClick={{
                      open: setOpenTypeUpdate,
                      set: setFieldsProductTypes,
                    }}
                    getRowId={"idproduct_types"}
                    sx={{
                      height: "450px",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        }
      />

      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={openTypeUpdate}
        onClose={handleClose}
      >
        <form onSubmit={handleUpdateProductsType}>
          <DialogTitle>Editar "Tipos de Producto"</DialogTitle>

          <DialogContent dividers>
            <Box my={3}>
              <TextFieldOutlined
                type={"text"}
                label={"Nombre "}
                value={product_types_name}
                setValue={setProduct_types_name}
                required
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant={"contained"} size={'small'} onClick={handleClose}>
              Cerrar
            </Button>

            <Button variant={"contained"} size={'small'} type="submit">
              Actualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Products;
