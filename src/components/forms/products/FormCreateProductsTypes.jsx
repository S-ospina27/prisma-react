import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DialogForm from "../../common/DialogForm";
import TextFieldFilled from "../../common/TextFieldFilled";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormCreateProductsTypes({
  alert,
  openTypeRegister,
  setOpenTypeRegister,
  datatable,
}) {
  const [idproduct_types, setIdproduct_types] = useState("");
  const [product_types_name, setProduct_types_name] = useState("");

  const setFields = (row = { product_types_name: "", idproduct_types: "" }) => {
    setProduct_types_name(row.product_types_name);
    setIdproduct_types(row.idproduct_types);
  };

  const handleCreateProductsType = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("product_types_name", product_types_name);

    axios
      .post(RoutesList.api.products.types.create, form, getHeader())
      .then((res) => {
        // console.log(res.data);
        setOpenTypeRegister(true);
        setFields();
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      });
  };

  return (
    <DialogForm
      title={"Tipos de Producto"}
      clean={setFields}
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
                <Chip color="dark-blue" label={"Detalles Tipo de Producto"} />
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
                {datatable}
              </Grid>
            </Grid>
          </Box>
        </Container>
      }
    />
  );
}

export default FormCreateProductsTypes;
