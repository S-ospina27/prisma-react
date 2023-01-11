import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function WarrantySelect({ value, setValue, required, disabled, readOnly }) {
  const [warranty, setWarranty] = useState(["SI", "NO"]);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-warranty-request">
        {"¿Cuenta con garantia?"}
      </InputLabel>

      <Select
        id="warranty-request"
        labelId="label-warranty-request"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {warranty.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default WarrantySelect;
