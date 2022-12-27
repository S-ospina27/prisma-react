import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";

function UsersSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  selected = [],
  label,
}) {
  const [users, setUsers] = useState([]);

  const handleReadUsers = () => {
    axios.get(RoutesList.api.users.read.filter).then((res) => {
      const rows = [];

      selected.map((rol) => {
        if (![undefined, false, null, ""].includes(res.data[rol])) {
          rows.push(...res.data[rol]);
        }
      });

      setUsers(rows);
    });
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <Autocomplete
      disablePortal
      filterSelectedOptions
      disabled={disabled}
      readOnly={readOnly}
      options={users.map(
        (user) =>
          `${user.idusers} - ${user.fullname}/${user.users_identification}`
      )}
      getOptionLabel={(user) => user}
      getOptionDisabled={(user) => user === value}
      isOptionEqualToValue={(user, value) => user === value}
      itemID={"idusers"}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={!label ? "Usuarios" : label}
          color={"blue"}
          variant={"filled"}
          required={required}
          InputProps={{
            ...params.InputProps,
            autoComplete: "off",
          }}
        />
      )}
    />
  );
}

export default UsersSelect;
