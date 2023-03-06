import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../DataTable";

import ColumnsTable from "../../tools/ColumnsTable";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function DataTableProductsTypes({ setOpenTypeUpdate, setRow }) {
  const [typeProducts_read, setTypeProducts_read] = useState([]);

  const handleReadTypeProducts = () => {
    axios.get(RoutesList.api.products.types.read, getHeader()).then((res) => {
      // console.log(res.data)
      setTypeProducts_read(!res.data.status ? res.data : []);
    });
  };

  useEffect(() => {
    handleReadTypeProducts();
  }, []);

  return (
    <DataTable
      reload={handleReadTypeProducts}
      rows={typeProducts_read}
      columns={ColumnsTable.type_products}
      onRowClick={{
        open: setOpenTypeUpdate,
        set: setRow,
      }}
      getRowId={"idproduct_types"}
      sx={{
        height: "450px",
      }}
    />
  );
}

export default DataTableProductsTypes;
