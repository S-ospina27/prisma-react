import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DialogForm from "../../common/DialogForm";
import ProductsTypeSelect from "../../common/ProductsTypeSelect";
import StatusSelect from "../../common/StatusSelect";
import TextFieldFile from "../../common/TextFieldFile";
import TextFieldFilled from "../../common/TextFieldFilled";
import RoutesList from "../../tools/RoutesList";
import { getHeaderMultipart } from "../../tools/SessionSettings";

function FormCreateProducts({ alert, loading, openRegister, setOpenRegister }) {
  const [idusers, setIdusers] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [products_color, setProducts_color] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idproduct_types, setIdproduct_types] = useState("");
  const [products_description, setProducts_description] = useState("");
  const [idstatus, setIdstatus] = useState("");
  const [products_image, setProducts_image] = useState([]);
  const [strProducts_image, setStrProducts_image] = useState("");

  const setFields = (
    row = {
      idusers: "",
      idproducts: "",
      products_reference: "",
      idproduct_types: "",
      products_description: "",
      products_color: "",
      idstatus: "",
      products_image: "",
    }
  ) => {
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
    loading(true);
    setOpenRegister(false);

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
      .post(RoutesList.api.products.create, form, getHeaderMultipart())
      .then((res) => {
        // console.log(res.data);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
        loading(false);
      });
  };

  return (
    <DialogForm
      title={"Registrar Productos"}
      clean={setFields}
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
                <Chip color="dark-blue" label={"Detalles de Producto"} />
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
  );
}

export default FormCreateProducts;
