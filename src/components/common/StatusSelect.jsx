import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";

function StatusSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  ignore = [],
}) {
  const [Status, setStatus] = useState([]);

  useEffect(() => {
    axios.get(RoutesList.api.status.index).then((res) => {
      setStatus(res.data);
    });
  }, []);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-status">{"Tipos de estado"}</InputLabel>

      <Select
        id="document-types"
        labelId="label-status"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {Status.map((item, index) => (
          <MenuItem value={item.idstatus} key={index}>
            {item.status_type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default StatusSelect;
