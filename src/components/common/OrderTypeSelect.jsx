import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function OrderTypeSelect({ value, setValue, required, disabled, readOnly }) {
  const [orderType, setOrderType] = useState(["MUESTRA", "PEDIDO"]);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-order-type">{"Tipo de Orden"}</InputLabel>

      <Select
        id="document-types"
        labelId="label-order-type"
        color={"blue"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {orderType.map((type, index) => (
          <MenuItem value={type} key={index}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default OrderTypeSelect;
