import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../DataTable";

import ColumnsTable from "../../tools/ColumnsTable";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

function DataTableSpareParts({ alert, setOpenUpdateSpareParts, setRow }) {
  const [spareParts, setSpareParts] = useState([]);

  const handleReadSpareParts = () => {
    axios
      .get(RoutesList.api.service.spare_parts.read, getHeader())
      .then((res) => {
        // console.log(res.data);

        if (!res.data.status) {
          setSpareParts(res.data);
        } else {
          alert({
            open: true,
            message: res.data.message,
            severity: res.data.status,
          });
        }
      });
  };

  useEffect(() => {
    handleReadSpareParts();
  }, []);

  return (
    <DataTable
      reload={handleReadSpareParts}
      rows={spareParts}
      columns={ColumnsTable.SpareParts}
      getRowId={"idspare_parts"}
      onRowClick={{
        open: setOpenUpdateSpareParts,
        set: setRow,
      }}
      sx={{
        height: "450px",
      }}
    />
  );
}

export default DataTableSpareParts;
