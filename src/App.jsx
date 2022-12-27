import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavbarNavigation from "./components/NavbarNavigation";
import Styles from "./components/tools/Styles";
import Users from "./pages/Users";
import Products from "./pages/Products";
import "./assets/css/app.css";
import ServiceOrders from "./pages/ServiceOrders";

function App() {
  return (
    <ThemeProvider theme={Styles}>
      <NavbarNavigation />

      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<h1>hola</h1>} />

        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="service-orders" element={<ServiceOrders />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
