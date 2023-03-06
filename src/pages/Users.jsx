import { Box, Chip, Container, Divider } from "@mui/material";
import { useState } from "react";

import DataTableUsers from "../components/forms/users/DataTableUsers";
import FormCreateUsers from "../components/forms/users/FormCreateUsers";
import FormUpdateUsers from "../components/forms/users/FormUpdateUsers";

function Users({ loading, alert }) {
  const [row, setRow] = useState({
    idusers: "",
    idroles: "",
    iddocument_types: "",
    users_identification: "",
    users_name: "",
    users_lastname: "",
    users_phone: "",
    users_address: "",
    iddepartments: "",
    departments_name: "",
    idcities: "",
    cities_name: "",
    users_email: "",
    users_contact_name: "",
    users_contact_phone: "",
    idstatus: 1,
    users_password: "",
  });
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <Box mx={3} my={3}>
      <Box mb={3}>
        <Divider>
          <Chip color="blue" label={"Usuarios"} />
        </Divider>
      </Box>

      <Container>
        <DataTableUsers
          setOpenUpdate={setOpenUpdate}
          setOpenRegister={setOpenRegister}
          setRow={setRow}
        />
      </Container>

      <FormCreateUsers
        alert={alert}
        loading={loading}
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />

      <FormUpdateUsers
        alert={alert}
        loading={loading}
        row={row}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
      />
    </Box>
  );
}

export default Users;
