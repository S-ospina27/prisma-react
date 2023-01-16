import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";

function ServiceStatesSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  ignore = [],
  ignoreItems = [],
}) {
  const [Status, setStatus] = useState([]);

  useEffect(() => {
    axios.get(RoutesList.api.status.service).then((res) => {
      setStatus(res.data);
    });
  }, []);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-service-states">{"Tipos de estado"}</InputLabel>

      <Select
        id="document-types"
        labelId="label-service-states"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {Status.map(
          (state, index) =>
            !ignore.includes(state.service_type) && (
              <MenuItem
                value={state.idservice_states}
                key={index}
                disabled={ignoreItems.includes(state.service_type) ?? true}
              >
                {state.service_type}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}

export default ServiceStatesSelect;
