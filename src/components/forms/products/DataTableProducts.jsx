import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../DataTable";

import ColumnsTable from "../../tools/ColumnsTable";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function DataTableProducts({ setRow, setOpenUpdate }) {
  const [products, setproducts] = useState([]);

  const handleReadProducts = () => {
    axios.get(RoutesList.api.products.read.index, getHeader()).then((res) => {
      // console.log(res.data);
      setproducts(!res.data.status ? res.data : []);
    });
  };

  useEffect(() => {
    handleReadProducts();
  }, []);

  return (
    <DataTable
      reload={handleReadProducts}
      rows={products}
      columns={ColumnsTable.products}
      onRowClick={{
        open: setOpenUpdate,
        set: setRow,
      }}
      getRowId={"idproducts"}
      sx={{
        height: "450px",
      }}
    />
  );
}

export default DataTableProducts;
