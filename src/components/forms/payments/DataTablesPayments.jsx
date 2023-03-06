import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTableCheckBox from "../../DataTableCheckBox";

import ColumnsTable from "../../tools/ColumnsTable";
import RoutesList from "../../tools/RoutesList";
import { getHeader } from "../../tools/SessionSettings";

import PriceCheckIcon from "@mui/icons-material/PriceCheck";

function DataTablesPayments({ alert, loading }) {
  const [payments, setPayments] = useState([]);
  const [items, setItems] = useState([]);

  const handleReadPayments = () => {
    axios.get(RoutesList.api.payments.read, getHeader()).then((res) => {
      // console.log(res.data);

      if (!res.data.status) {
        setPayments(res.data);
      } else {
        alert({
          open: true,
          message: res.data.message,
          severity: res.data.status,
        });
      }
    });
  };

  const handleMassivePayments = () => {
    if (items.length > 0) {
      loading(true);
      const form = new FormData();
      items.forEach((item) => form.append("items[]", item));

      axios
        .post(RoutesList.api.payments.update.massive, form, getHeader())
        .then((res) => {
          // console.log(res.data);
          loading(false);
          handleReadPayments();
          alert({
            open: true,
            message: res.data.message,
            severity: res.data.status,
          });
        });
    } else {
      alert({
        open: true,
        message: "Debe seleccionar los pagos",
        severity: "warning",
      });
    }
  };

  useEffect(() => {
    handleReadPayments();
  }, []);

  return (
    <DataTableCheckBox
      setValue={setItems}
      reload={handleReadPayments}
      rows={payments}
      columns={ColumnsTable.payments}
      getRowId={"idpayments"}
      sx={{
        height: "450px",
      }}
      toolbar={
        <Button
          type="button"
          disabled={items.length > 0 ? false : true}
          onClick={handleMassivePayments}
          startIcon={<PriceCheckIcon />}
        >
          {"Pago"}
        </Button>
      }
    />
  );
}

export default DataTablesPayments;
