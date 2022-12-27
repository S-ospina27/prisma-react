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
    <FormControl variant="outlined" fullWidth >
      <InputLabel id="label-Tipo-estados">{"Tipo de estados"}</InputLabel>

      <Select
        id="document-types"
        labelId="label-Tipo-estados"
        color={"primary"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {Status.map(
          (item, index) =>
              <MenuItem value={item.idstatus} key={index}>
                {item.status_type}
              </MenuItem>
            
        )}
      </Select>
    </FormControl>
  );
}

export default StatusSelect;
