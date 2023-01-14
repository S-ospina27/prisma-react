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
import dayjs from "dayjs";
import axios from "axios";
import DataTable from "../components/DataTable";
import DialogForm from "../components/common/DialogForm";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";
import TextFieldFilled from "../components/common/TextFieldFilled";
import RoutesList from "../components/tools/RoutesList";
import ColumnsTable from "../components/tools/ColumnsTable";


function Technical({ loading, alert }) {
  const [CreatTechnical, setOpenCreatTechnical] = useState(false);
  const [Technical, setTechnical] = useState([]);

  const [idtechnical_inventory,setIdtechnical_inventory]= useState("");
  const [idspare_parts, setIdspare_parts]= useState("");
  const [idusers,setIdusers]= useState("");
  const [technical_inventory_amount, setTechnical_inventory_amount]= useState("");
  const [technical_inventory_quantity_used,setTechnical_inventory_quantity_used]=useState("");
  const [technical_inventory_quantity_available,setTechnical_inventory_quantity_available]= useState("");
  const [idservice_states,setIdservice_states]= useState("");
  const [technical_inventory_description,setTechnical_inventory_description]= useState("");

  const setFields = (row = { }) => {
    console.log( idservice_states)
    console.log(row);
    setIdtechnical_inventory(row.idtechnical_inventory);
    setIdusers(row.TENICO);
    setIdspare_parts(row.spare_parts_name);
    setTechnical_inventory_amount(row.technical_inventory_amount);
    setTechnical_inventory_quantity_used(row.technical_inventory_quantity_used);
    setTechnical_inventory_quantity_available(row.technical_inventory_quantity_available)
    setIdservice_states(row.idservice_states);
    setTechnical_inventory_description(row.technical_inventory_description == null ?"" :row.technical_inventory_description);
  };

  const handleReadTechnical = () => {
    axios.get(RoutesList.api.spare_parts.inventory.read).then((res) => {
      // console.log(res.data);
      setTechnical(res.data);
    });
  };

  const handleUpdateinventoryTechnical = (e) => {
    e.preventDefault();
    setOpenCreatTechnical(false);
    loading(true);
  };

  useEffect(() => {
    handleReadTechnical();
  }, []);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="blue" label={"Inventario Tecnicos"} />
        </Divider>
      </Box>


      <DataTable
        reload={handleReadTechnical}
        rows={Technical}
        columns={ColumnsTable.Technical}
        getRowId={"idtechnical_inventory"}
        onRowClick={{
          open: setOpenCreatTechnical,
          set: setFields,
        }}
        sx={{
          height: "450px",
        }}
      />

      <DialogForm
        title={"Actualizar Solicitud de Inventario"}
        open={CreatTechnical}
        setOpen={setOpenCreatTechnical}
        button={{
          type: "submit",
          label: "Actualizar",
          onSubmit: handleUpdateinventoryTechnical,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles de solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Tecnico"}
                  type={"text"}
                  value={idusers}
                  setValue={setIdusers}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  ignore={[
                    "NO-DESPACHADO",
                    "ACEPTADO",
                    "ENVIADO",
                    "DESPACHADO",
                    "INCREMENTAR-INVENTARIO",
                    "PENDIENTE"
                  ]}
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Información del repuesto"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Repuesto"}
                  type={"text"}
                  value={idspare_parts}
                  setValue={setIdspare_parts}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos"}
                  type={"number"}
                  value={technical_inventory_amount}
                  setValue={setTechnical_inventory_amount}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos usados"}
                  type={"number"}
                  value={technical_inventory_quantity_used}
                  setValue={setTechnical_inventory_quantity_used}
                  required
                  readOnly
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextFieldFilled
                  label={"Cantidad repuestos disponibles"}
                  type={"number"}
                  value={technical_inventory_quantity_available}
                  setValue={setTechnical_inventory_quantity_available}
                  required
                  readOnly
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Información de solicitud"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextFieldFilled
                  label={"Descripción"}
                  type={"number"}
                  value={technical_inventory_description}
                  setValue={setTechnical_inventory_description}
                  readOnly
                />
              </Grid>
            </Grid>
          </Container>
        }
      />
    </Box>
  );
}

export default Technical;
