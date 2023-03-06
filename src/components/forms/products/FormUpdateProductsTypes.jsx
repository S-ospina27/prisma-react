import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogTransition from "../../common/DialogTransition";
import TextFieldOutlined from "../../common/TextFieldOutlined";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormUpdateProductsTypes({
  row,
  alert,
  openTypeUpdate,
  setOpenTypeUpdate,
}) {
  const [idproduct_types, setIdproduct_types] = useState("");
  const [product_types_name, setProduct_types_name] = useState("");

  const handleUpdateProductsType = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("product_types_name", product_types_name);
    form.append("idproduct_types", idproduct_types);

    axios
      .post(RoutesList.api.products.types.update, form, getHeader())
      .then((res) => {
        // console.log(res.data);

        setOpenTypeUpdate(false);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      });
  };

  useEffect(() => {
    // console.log(row);
    setIdproduct_types(row.idproduct_types);
    setProduct_types_name(row.product_types_name);
  }, [row]);

  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={openTypeUpdate}
      onClose={() => setOpenTypeUpdate(false)}
      TransitionComponent={DialogTransition}
    >
      <form onSubmit={handleUpdateProductsType}>
        <DialogTitle>{'Editar "Tipos de Producto"'}</DialogTitle>

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
          <Button variant={"contained"} size={"small"} type="submit">
            {"Actualizar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormUpdateProductsTypes;
