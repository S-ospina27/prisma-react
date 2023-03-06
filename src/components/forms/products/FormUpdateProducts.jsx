import { Box, Button, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogForm from "../../common/DialogForm";
import ProductsTypeSelect from "../../common/ProductsTypeSelect";
import StatusSelect from "../../common/StatusSelect";
import TextFieldFile from "../../common/TextFieldFile";
import TextFieldFilled from "../../common/TextFieldFilled";
import RoutesList from "../../tools/RoutesList";
import { getHeaderMultipart } from "../../tools/SessionSettings";

function FormUpdateProducts({
  loading,
  alert,
  row,
  openUpdate,
  setOpenUpdate,
}) {
  const [idusers, setIdusers] = useState("");
  const [idproducts, setIdproducts] = useState("");
  const [products_color, setProducts_color] = useState("");
  const [products_reference, setProducts_reference] = useState("");
  const [idproduct_types, setIdproduct_types] = useState("");
  const [products_description, setProducts_description] = useState("");
  const [idstatus, setIdstatus] = useState("");
  const [products_image, setProducts_image] = useState([]);
  const [strProducts_image, setStrProducts_image] = useState("");

  const handleUpdateProducts = (e) => {
    e.preventDefault();
    loading(true);
    setOpenUpdate(false);

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
      .post(RoutesList.api.products.update, form, getHeaderMultipart())
      .then((res) => {
        // console.log(res.data);

        loading(false);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      });
  };

  useEffect(() => {
    // console.log(row);
    setIdusers(row.idusers);
    setIdproducts(row.idproducts);
    setProducts_color(row.products_color);
    setProducts_reference(row.products_reference);
    setIdproduct_types(row.idproduct_types);
    setProducts_description(row.products_description);
    setIdstatus(row.idstatus);
    setProducts_image([]);
    setStrProducts_image(row.products_image);
  }, [row]);

  return (
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

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Archivos Cargados"} />
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
  );
}

export default FormUpdateProducts;
