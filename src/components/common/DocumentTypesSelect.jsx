import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";
import { getHeader } from "../tools/SessionSettings";

function DocumentTypesSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  ignore = [],
}) {
  const [document_types, setDocument_types] = useState([]);

  useEffect(() => {
    axios.get(RoutesList.api.read_document_types, getHeader()).then((res) => {
      setDocument_types(res.data);
    });
  }, []);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-document-types">{"Tipos de Documento"}</InputLabel>

      <Select
        id="document-types"
        labelId="label-document-types"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {document_types.map(
          (type, index) =>
            !ignore.includes(type.document_types_name) && (
              <MenuItem value={type.iddocument_types} key={index}>
                {type.document_types_name}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}

export default DocumentTypesSelect;
