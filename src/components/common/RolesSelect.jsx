import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";
import { getHeader } from "../tools/SessionSettings";

function RolesSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  ignore = [],
}) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(RoutesList.api.read_roles, getHeader()).then((res) => {
      setRoles(res.data);
    });
  }, []);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-id-roles">{"Roles"}</InputLabel>

      <Select
        id="id-roles"
        labelId="label-id-roles"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {roles.map(
          (rol, index) =>
            !ignore.includes(rol.roles_name) && (
              <MenuItem value={rol.idroles} key={index}>
                {rol.roles_name}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}

export default RolesSelect;
