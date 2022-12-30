import { Slide } from "@mui/material";
import { forwardRef } from "react";

export default forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
