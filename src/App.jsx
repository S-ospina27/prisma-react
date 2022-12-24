import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavbarNavigation from "./components/NavbarNavigation";
import Styles from "./components/tools/Styles";
import Users from "./pages/Users";
import "./assets/css/app.css";

function App() {
  return (
    <ThemeProvider theme={Styles}>
      <NavbarNavigation />

      <Routes>
        <Route path="/" element={<h1>hola</h1>} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
