import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import TextFieldFilled from "../../common/TextFieldFilled";

import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function FormCreateSpareParts({ alert, loading }) {
  const [spare_parts_name, setSpare_parts_name] = useState("");
  const [spare_parts_amount, setSpare_parts_amount] = useState("");

  const handleCreateSpareParts = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("spare_parts_name", spare_parts_name);
    form.append("spare_parts_amount", spare_parts_amount);

    axios
      .post(RoutesList.api.service.spare_parts.create, form, getHeader())
      .then((res) => {
        // console.log(res.data);
        setSpare_parts_name("");
        setSpare_parts_amount("");

        loading(false);
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      });
  };

  return (
    <form onSubmit={handleCreateSpareParts}>
      <Grid item xs={12} m={2} sm={12} md={12}>
        <TextFieldFilled
          label={"Nombre"}
          type={"text"}
          value={spare_parts_name}
          setValue={setSpare_parts_name}
          required
        />
      </Grid>

      <Grid item xs={12} m={2} sm={12} md={12}>
        <TextFieldFilled
          label={"Cantidad"}
          type={"number"}
          value={spare_parts_amount}
          setValue={setSpare_parts_amount}
          required
        />
      </Grid>

      <Grid item xs={12} m={2} sm={12} md={12}>
        <Button type="submit" variant="contained">
          {"Registrar"}
        </Button>
      </Grid>
    </form>
  );
}

export default FormCreateSpareParts;
