import { createTheme } from "@mui/material/styles";

const Styles = createTheme({
  palette: {
    "light-blue": {
      main: "#5EC4EE",
      contrastText: "#FFFFFF"
    },
    blue: {
      main: "#2A8AC2",
      contrastText: "#FFFFFF"
    },
    "dark-blue": {
      main: "#263B56",
      contrastText: "#FFFFFF"
    },
    white: {
      main: "#FFFFFF",
      contrastText: "#000000"
    },
    "light-gray": {
      main: "#D6DBE1",
      contrastText: "#000000"
    },
    "light-orange": {
      main: "#E5D2C3",
      contrastText: "#000000"
    },
  },
});

export default Styles;
