import { Box, Chip, Divider, Grid } from "@mui/material";
import { useState } from "react";
import DataTableSpareParts from "../components/forms/spare-parts/DataTableSpareParts";
import FormCreateSpareParts from "../components/forms/spare-parts/FormCreateSpareParts";
import FormUpdateSpareParts from "../components/forms/spare-parts/FormUpdateSpareParts";

function SpareParts({ loading, alert }) {
  const [row, setRow] = useState({
    spare_parts_name: "",
    spare_parts_amount: "",
  });
  const [openUpdateSpareParts, setOpenUpdateSpareParts] = useState(false);

  return (
    <Box mx={3} my={3}>
      <Box mb={2}>
        <Divider>
          <Chip color="blue" label={"Inventario"} />
        </Divider>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5}>
          <FormCreateSpareParts alert={alert} loading={loading} />
        </Grid>

        <Grid item xs={12} sm={12} md={7}>
          <DataTableSpareParts
            alert={alert}
            setRow={setRow}
            setOpenUpdateSpareParts={setOpenUpdateSpareParts}
          />
        </Grid>
      </Grid>

      <FormUpdateSpareParts
        alert={alert}
        loading={loading}
        row={row}
        openUpdateSpareParts={openUpdateSpareParts}
        setOpenUpdateSpareParts={setOpenUpdateSpareParts}
      />
    </Box>
  );
}

export default SpareParts;
