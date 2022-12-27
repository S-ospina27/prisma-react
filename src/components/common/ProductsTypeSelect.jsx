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

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="label-product-types">{"Tipos de Producto"}</InputLabel>

      <Select
        id="Tipo de Productos"
        labelId="label-product-types"
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
