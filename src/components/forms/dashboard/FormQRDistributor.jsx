import { Box, Button, Grid } from "@mui/material";
import QRCode from "react-qr-code";

import { getJWT } from "../../tools/SessionSettings";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

function FormQRDistributor({ alert }) {
  const [text, setText] = useState(
    "/service/application-order-form/" + getJWT("idusers")
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} mx={"auto"}>
        <Box my={3}>
          <QRCode
            size={256}
            value={import.meta.env.VITE_SERVER_URL + text}
            viewBox={`0 0 256 256`}
            style={{ width: "100%" }}
          />
        </Box>

        <Box mb={2}>
          <Button
            variant="contained"
            color="whatsapp"
            startIcon={<WhatsAppIcon />}
            sx={{ width: "100%" }}
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send?text=" +
                  import.meta.env.VITE_SERVER_URL +
                  text
              );
            }}
          >
            {"Whatsapp"}
          </Button>
        </Box>

        <Box mb={2}>
          <Button
            variant="contained"
            color="gray"
            startIcon={<ContentCopyIcon />}
            sx={{ width: "100%" }}
            onClick={() => {
              navigator.clipboard.writeText(
                import.meta.env.VITE_SERVER_URL + text
              );

              alert({
                open: true,
                message: "URL copiada",
                severity: "info",
                time: 2000,
              });
            }}
          >
            {"Copiar"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FormQRDistributor;
