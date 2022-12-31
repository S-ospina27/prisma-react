import { Route, Routes } from "react-router-dom";
import {
  Alert,
  Box,
  LinearProgress,
  Slide,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";

import Styles from "./components/tools/Styles";

import NavbarNavigation from "./components/NavbarNavigation";
import Users from "./pages/Users";
import Products from "./pages/Products";
import "./assets/css/app.css";
import ServiceOrders from "./pages/ServiceOrders";
import Login from "./pages/Login";

function App() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <ThemeProvider theme={Styles}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="light-blue" />
        </Box>
      )}

      {alert.open && (
        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setAlert(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
          <Alert
            severity={
              ["error", "route-error", "database-error"].includes(
                alert.severity
              )
                ? "error"
                : alert.severity
            }
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <NavbarNavigation />

      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<h1>hola</h1>} />

        <Route path="auth">
          <Route
            path="login"
            element={<Login loading={setLoading} alert={setAlert} />}
          />
        </Route>

        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />

        <Route
          path="service-orders"
          element={<ServiceOrders loading={setLoading} alert={setAlert} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
