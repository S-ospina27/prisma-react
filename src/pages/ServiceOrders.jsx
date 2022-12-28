import { Box, Chip, Divider } from "@mui/material";
import { useState } from "react";
import MenuItems from "../components/common/MenuItems";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DialogForm from "../components/common/DialogForm";

function ServiceOrders() {
  const [openCreateOrders, setOpenCreateOrders] = useState(false);

  const handleCreateServiceOrders = (e) => {
    e.preventDefault();
    console.log("submitted");
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
        content={<h1>Hola mundo</h1>}
      />
    </Box>
  );
}

export default ServiceOrders;
