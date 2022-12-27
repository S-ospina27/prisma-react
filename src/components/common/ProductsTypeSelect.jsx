import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";

function ProductsTypeSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  ignore = [],
}) {
  const [typeProducts, setTypeProducts] = useState([]);

  useEffect(() => {
    axios.get(RoutesList.api.products.types.read).then((res) => {
      setTypeProducts(!res.data.status ? res.data : []);
    });
  }, []);
  console.log(typeProducts);
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="label-Tipo-Productos">{"Tipo de Productos"}</InputLabel>

      <Select
        id="Tipo de Productos"
        labelId="label-Tipo-Productos"
        color={"blue-quinary"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {typeProducts.map((type, index) => (
          <MenuItem value={type.idproduct_types} key={index}>
            {type.product_types_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProductsTypeSelect;
