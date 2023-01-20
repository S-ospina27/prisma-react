import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";
import { getHeader } from "../tools/SessionSettings";

function ProductsSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  selected = [],
  label,
  showColumns = [],
}) {
  const [products, setProducts] = useState([]);

  const handleReadProducts = () => {
    axios
      .get(RoutesList.api.products.read.by_status, getHeader())
      .then((res) => {
        const rows = [];

        selected.map((product) => {
          if (![undefined, false, null, ""].includes(res.data[product])) {
            rows.push(...res.data[product]);
          }
        });

        setProducts(rows);
      });
  };

  useEffect(() => {
    handleReadProducts();
  }, []);

  return (
    <Autocomplete
      disablePortal
      filterSelectedOptions
      disabled={disabled}
      readOnly={readOnly}
      options={products.map((product) => {
        if (showColumns.length > 0) {
          let text = `${product.idproducts} - ${product.products_reference}`;
          showColumns.forEach((column) => (text += `/${product[column]}`));
          return text;
        } else {
          return `${product.idproducts} - ${product.products_reference}`;
        }
      })}
      getOptionLabel={(product) => product}
      getOptionDisabled={(product) => product === value}
      isOptionEqualToValue={(product, value) => product === value}
      itemID={"idproducts"}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={!label ? "Productos" : label}
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

export default ProductsSelect;
