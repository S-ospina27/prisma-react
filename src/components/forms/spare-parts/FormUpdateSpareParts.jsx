import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogTransition from "../../common/DialogTransition";
import TextFieldFilled from "../../common/TextFieldFilled";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormUpdateSpareParts({
  alert,
  loading,
  row,
  openUpdateSpareParts,
  setOpenUpdateSpareParts,
}) {
  const [idspare_parts, setIdspare_parts] = useState("");
  const [spare_parts_name, setSpare_parts_name] = useState("");
  const [spare_parts_amount, setSpare_parts_amount] = useState("");
  const [spare_parts_amount_copy, setSpare_parts_amount_copy] = useState("");

  const handleUpdateSpareParts = (e) => {
    e.preventDefault();
    loading(true);
    setOpenUpdateSpareParts(false);

    const form = new FormData();
    form.append("idspare_parts", idspare_parts);
    form.append("spare_parts_name", spare_parts_name);
    form.append("spare_parts_amount", spare_parts_amount);
    form.append("spare_parts_amount_copy", spare_parts_amount_copy);

    axios
      .post(RoutesList.api.service.spare_parts.update, form, getHeader())
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
    setIdspare_parts(row.idspare_parts);
    setSpare_parts_name(row.spare_parts_name);
    setSpare_parts_amount(0);
    setSpare_parts_amount_copy(row.spare_parts_amount);
  }, [row]);

  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={openUpdateSpareParts}
      onClose={() => setOpenUpdateSpareParts(false)}
      TransitionComponent={DialogTransition}
    >
      <form onSubmit={handleUpdateSpareParts}>
        <DialogTitle>{'Editar "Repuesto"'}</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextFieldFilled
                type={"text"}
                label={"Nombre "}
                value={spare_parts_name}
                setValue={setSpare_parts_name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"number"}
                label={"Cantidad Actual"}
                value={spare_parts_amount_copy}
                setValue={setSpare_parts_amount_copy}
                required
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextFieldFilled
                type={"number"}
                label={"Cantidad Solicitada"}
                value={spare_parts_amount}
                setValue={setSpare_parts_amount}
                required
              />
            </Grid>
          </Grid>
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

export default FormUpdateSpareParts;
