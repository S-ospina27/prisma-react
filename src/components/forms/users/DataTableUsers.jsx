import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../DataTable";

import ColumnsTable from "../../tools/ColumnsTable";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function DataTableUsers({ setOpenUpdate, setOpenRegister, setRow }) {
  const [users, setUsers] = useState([]);

  const handleReadUsers = () => {
    axios.get(RoutesList.api.users.read.index, getHeader()).then((res) => {
      // console.log(res.data)

      if (!res.data.status) {
        setUsers(res.data);
      } else {
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      }
    });
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <DataTable
      reload={handleReadUsers}
      rows={users}
      columns={ColumnsTable.users}
      onRowClick={{
        open: setOpenUpdate,
        set: setRow,
      }}
      getRowId={"idusers"}
      sx={{
        height: "450px",
      }}
      toolbar={
        <Button
          type="button"
          size="small"
          color={"blue"}
          onClick={() => setOpenRegister(true)}
          startIcon={<PersonAddAlt1Icon color={"blue"} />}
        >
          {"Registrar"}
        </Button>
      }
    />
  );
}

export default DataTableUsers;
