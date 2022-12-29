import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import { useState } from "react";
import MenuItems from "../components/common/MenuItems";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogForm from "../components/common/DialogForm";
import ProductsSelect from "../components/common/ProductsSelect";
import UsersSelect from "../components/common/UsersSelect";
import ServiceStatesSelect from "../components/common/ServiceStatesSelect";

function ServiceOrders() {
  const [openCreateOrders, setOpenCreateOrders] = useState(true);

  const [idproducts, setIdproducts] = useState("");
  const [idusers, setIdusers] = useState("");
  const [idservice_states, setIdservice_states] = useState("");

  const setFields = (row) => {};

  const handleCreateServiceOrders = (e) => {
    e.preventDefault();
    console.log(idproducts);
  };

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip color="blue" label={"Ordenes de Servicio"} />
        </Divider>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MenuItems
          id={"operations"}
          iconButton={true}
          label={<MoreVertIcon color={"dark-blue"} />}
          items={[
            {
              type: "modal",
              name: "Crear Orden de Servicio",
              icon: <AssignmentIcon color={"dark-blue"} />,
              setOpen: setOpenCreateOrders,
              idroles: [1],
            },
          ]}
        />
      </Box>

      <DialogForm
        open={openCreateOrders}
        setOpen={setOpenCreateOrders}
        title={"Registrar Ordenes de Servicio"}
        button={{
          type: "submit",
          label: "Registrar",
          onSubmit: handleCreateServiceOrders,
        }}
        content={
          <Container>
            <Box mb={3}>
              <Divider textAlign="left">
                <Chip color="dark-blue" label={"Detalles Orden de Servicio"} />
              </Divider>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <ProductsSelect
                  value={idproducts}
                  setValue={setIdproducts}
                  selected={["ACTIVO"]}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <UsersSelect
                  value={idusers}
                  setValue={setIdusers}
                  required
                  selected={["PROVEEDOR"]}
                />
              </Grid>

              {/* <Grid item xs={12} sm={12} md={6}>
                <ServiceStatesSelect
                  value={idservice_states}
                  setValue={setIdservice_states}
                  required
                  // ignore={['ACEPTADO', 'RECHAZADO', 'PENDIENTE', 'EN-PROCESO', 'ENVIADO']} // administrador
                  // ignore={['NO-DESPACHADO', 'DESPACHADO', 'FINALIZADO']} // proveedor
                />
              </Grid> */}
            </Grid>
          </Container>
        }
      />
    </Box>
  );
}

export default ServiceOrders;
