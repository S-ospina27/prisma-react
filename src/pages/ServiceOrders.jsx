import { Box, Chip, Divider } from "@mui/material";
import { useState } from "react";
import MenuItems from "../components/common/MenuItems";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";

function ServiceOrders() {
  const [openCreateOrders, setOpenCreateOrders] = useState(false);

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
          label={<MoreVertIcon color={"primary"} />}
          items={[
            {
              type: "modal",
              name: "Crear Orden de Servicio",
              icon: <AssignmentIcon color={"primary"} />,
              setOpen: setOpenCreateOrders,
              idroles: [1],
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default ServiceOrders;
