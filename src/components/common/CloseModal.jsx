import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const CloseModal = ({ set }) => {
  return (
    <IconButton
      aria-label="close"
      onClick={() => set(false)}
      sx={{ position: "absolute", right: 8, top: 8, color: "#FFFFFF" }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseModal;
