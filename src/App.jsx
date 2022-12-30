import { Route, Routes } from "react-router-dom";
import { Box, LinearProgress, ThemeProvider } from "@mui/material";
import { useState } from "react";

import Styles from "./components/tools/Styles";

import NavbarNavigation from "./components/NavbarNavigation";
import Users from "./pages/Users";
import Products from "./pages/Products";
import "./assets/css/app.css";
import ServiceOrders from "./pages/ServiceOrders";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={Styles}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="light-blue" />
        </Box>
      )}

      <NavbarNavigation />

      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<h1>hola</h1>} />

        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />

        <Route
          path="service-orders"
          element={<ServiceOrders setLoading={setLoading} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
