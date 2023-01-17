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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import TextFieldFilled from "../components/common/TextFieldFilled";
import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";
import DialogTransition from "../components/common/DialogTransition";

function SpareParts({ loading, alert }) {
  const [OpenUpdateSpareParts, setOpenUpdateSpareParts] = useState(false);
  const [SpareParts, setSpareParts] = useState([]);

  const [spare_parts_name_c, setSpare_parts_name_c] = useState("");
  const [spare_parts_amount_c, setSpare_parts_amount_c] = useState("");

  const [idspare_parts, setIdspare_parts] = useState("");
  const [spare_parts_name, setSpare_parts_name] = useState("");
  const [spare_parts_amount, setSpare_parts_amount] = useState("");
  const [spare_parts_amount_copy, setSpare_parts_amount_copy] = useState("");

  const setFields = (
    row = {
      spare_parts_name: "",
      spare_parts_amount: "",
    }
  ) => {
    // console.log(row);
    setIdspare_parts(row.idspare_parts);
    setSpare_parts_name(row.spare_parts_name);
    setSpare_parts_amount(0);
    setSpare_parts_amount_copy(row.spare_parts_amount);
  };

  const handleClose = () => {
    setOpenUpdateSpareParts(false);
  };

  const handleReadSpareParts = () => {
    axios.get(RoutesList.api.service.spare_parts.read).then((res) => {
      // console.log(res.data);
      setSpareParts(!res.data.status ? res.data : []);
    });
  };

  const handleCreateSpareParts = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("spare_parts_name", spare_parts_name_c);
    form.append("spare_parts_amount", spare_parts_amount_c);

    axios.post(RoutesList.api.service.spare_parts.create, form).then((res) => {
      // console.log(res.data);
      setSpare_parts_name_c("");
      setSpare_parts_amount_c("");

      handleReadSpareParts();
      loading(false);
      alert({
        open: true,
        message: res.data.message,
        severity: res.data.status,
      });
    });
  };

  const handleUpdateSpareParts = (e) => {
    e.preventDefault();
    loading(true);
    setOpenUpdateSpareParts(false);

    const form = new FormData();
    form.append("idspare_parts", idspare_parts);
    form.append("spare_parts_name", spare_parts_name);
    form.append("spare_parts_amount", spare_parts_amount);
    form.append("spare_parts_amount_copy", spare_parts_amount_copy);

    axios.post(RoutesList.api.service.spare_parts.update, form).then((res) => {
      // console.log(res.data);
      setFields();

      handleReadSpareParts();
      loading(false);
      alert({
        open: true,
        message: res.data.message,
        severity: res.data.status,
      });
    });
  };

  useEffect(() => {
    handleReadSpareParts();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="blue" label={"Inventario"} />
        </Divider>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <form onSubmit={handleCreateSpareParts}>
            <Grid item xs={12} m={2} sm={12} md={12}>
              <TextFieldFilled
                label={"Nombre"}
                type={"text"}
                value={spare_parts_name_c}
                setValue={setSpare_parts_name_c}
                required
              />
            </Grid>

            <Grid item xs={12} m={2} sm={12} md={12}>
              <TextFieldFilled
                label={"Cantidad"}
                type={"number"}
                value={spare_parts_amount_c}
                setValue={setSpare_parts_amount_c}
                required
              />
            </Grid>

            <Grid item xs={12} m={2} sm={12} md={12}>
              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <DataTable
            reload={handleReadSpareParts}
            rows={SpareParts}
            columns={ColumnsTable.SpareParts}
            getRowId={"idspare_parts"}
            onRowClick={{
              open: setOpenUpdateSpareParts,
              set: setFields,
            }}
            sx={{
              height: "450px",
            }}
          />
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={OpenUpdateSpareParts}
        onClose={handleClose}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={handleUpdateSpareParts}>
          <DialogTitle>Editar "Repuesto"</DialogTitle>

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
              Actualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default SpareParts;
