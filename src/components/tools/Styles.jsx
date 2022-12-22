import { createTheme } from "@mui/material/styles";

const palette_colors = {
  white: {
    primary: "#FFFFFF",
    light: {
      background: "#F7F7F7",
    },
  },
  blue: {
    primary: {
      background: "#4170BF",
      color: "#4170BF",
      hover: "#4170BF",
    },
    secondary: {
      background: "#5DA4D9",
      color: "#5DA4D9",
      hover: "#5DA4D9",
    },
    tertiary: {
      background: "#263D68",
      color: "#263D68",
      hover: "#263D68",
    },
    quaternary: {
      background: "#1B3066",
      color: "#1B3066",
      hover: "#1B3066",
    },
    quinary: {
      background: "#162852",
      color: "#162852",
      hover: "#162864",
    },
  },
};

const Styles = createTheme({
  palette: {
    mode: [null, undefined].includes(localStorage.getItem("theme"))
      ? "light"
      : localStorage.getItem("theme"),
    "white-primary": {
      main: palette_colors.white.primary.background,
    },
    "white-light": {
      main: palette_colors.white.light.background,
    },
    "blue-primary": {
      main: palette_colors.blue.primary.background,
      contrastText: palette_colors.white.primary,
    },
    "blue-secondary": {
      main: palette_colors.blue.secondary.background,
      contrastText: palette_colors.white.primary,
    },
    "blue-tertiary": {
      main: palette_colors.blue.tertiary.background,
      contrastText: palette_colors.white.primary,
    },
    "blue-quaternary": {
      main: palette_colors.blue.quaternary.background,
      contrastText: palette_colors.white.primary,
    },
    "blue-quinary": {
      main: palette_colors.blue.quinary.background,
      contrastText: palette_colors.white.primary,
    },
  },
});

export default Styles;
