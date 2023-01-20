import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";
import { getHeader } from "../tools/SessionSettings";

function ServiceRequestSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  selected = [],
  label,
}) {
  const [serviceRequest, setServiceRequest] = useState([]);

  const handleReadServiceRequest = () => {
    axios
      .get(RoutesList.api.service.request.read.by_state, getHeader())
      .then((res) => {
        const rows = [];

        selected.map((request) => {
          if (![undefined, false, null, ""].includes(res.data[request])) {
            rows.push(...res.data[request]);
          }
        });

        setServiceRequest(rows);
      });
  };

  useEffect(() => {
    handleReadServiceRequest();
  }, []);

  return (
    <Autocomplete
      disablePortal
      filterSelectedOptions
      disabled={disabled}
      readOnly={readOnly}
      options={serviceRequest.map((request) => request.guide)}
      getOptionLabel={(request) => request}
      getOptionDisabled={(request) => request === value}
      isOptionEqualToValue={(request, value) => request === value}
      itemID={"idservice_request"}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={!label ? "Solicitudes" : label}
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

export default ServiceRequestSelect;
