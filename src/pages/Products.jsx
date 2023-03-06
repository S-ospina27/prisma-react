import { Box, Chip, Container, Divider } from "@mui/material";
import { useState } from "react";
import MenuItems from "../components/common/MenuItems";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DataTableProducts from "../components/forms/products/DataTableProducts";
import FormCreateProducts from "../components/forms/products/FormCreateProducts";
import FormUpdateProducts from "../components/forms/products/FormUpdateProducts";
import FormCreateProductsTypes from "../components/forms/products/FormCreateProductsTypes";
import DataTableProductsTypes from "../components/forms/products/DataTableProductsTypes";
import FormUpdateProductsTypes from "../components/forms/products/FormUpdateProductsTypes";

function Products({ loading, alert }) {
  const [row, setRow] = useState({
    idusers: "",
    idproducts: "",
    products_reference: "",
    idproduct_types: "",
    products_description: "",
    products_color: "",
    idstatus: "",
    products_image: "",
  });

  const [rowProductTypes, setRowProductTypes] = useState({
    idproduct_types: "",
    product_types_name: "",
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openTypeRegister, setOpenTypeRegister] = useState(false);
  const [openTypeUpdate, setOpenTypeUpdate] = useState(false);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip label={"Productos"} color="blue" />
        </Divider>
      </Box>

      <Container>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
          <MenuItems
            id={"products"}
            iconButton={true}
            label={<MoreVertIcon color={"dark-blue"} />}
            items={[
              {
                type: "modal",
                name: "Registrar Productos",
                icon: <AddShoppingCartIcon color={"dark-blue"} />,
                setOpen: setOpenRegister,
                idroles: [1],
              },
              {
                type: "modal",
                name: "Tipos de Producto",
                icon: <AddShoppingCartIcon color={"dark-blue"} />,
                setOpen: setOpenTypeRegister,
                idroles: [1],
              },
            ]}
          />
        </Box>

        <DataTableProducts setRow={setRow} setOpenUpdate={setOpenUpdate} />
      </Container>

      <FormCreateProducts
        loading={loading}
        alert={alert}
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />

      <FormUpdateProducts
        loading={loading}
        alert={alert}
        row={row}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
      />

      <FormCreateProductsTypes
        alert={alert}
        openTypeRegister={openTypeRegister}
        setOpenTypeRegister={setOpenTypeRegister}
        datatable={
          <DataTableProductsTypes
            setRow={setRowProductTypes}
            setOpenTypeUpdate={setOpenTypeUpdate}
          />
        }
      />

      <FormUpdateProductsTypes
        alert={alert}
        row={rowProductTypes}
        openTypeUpdate={openTypeUpdate}
        setOpenTypeUpdate={setOpenTypeUpdate}
      />
    </Box>
  );
}

export default Products;
