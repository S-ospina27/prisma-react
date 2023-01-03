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
import NoAuthenticationMiddleware from "./middleware/NoAuthenticationMiddleware";
import WithAuthenticationMiddleware from "./middleware/WithAuthenticationMiddleware";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const AllRoutes = () => {
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route path="auth">
          <Route
            path="login"
            element={
              <NoAuthenticationMiddleware>
                <Login loading={setLoading} alert={setAlert} />
              </NoAuthenticationMiddleware>
            }
          />
        </Route>

        <Route
          path="users"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <Users loading={setLoading} alert={setAlert} />
            </WithAuthenticationMiddleware>
          }
        />

        <Route
          path="products"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <Products loading={setLoading} alert={setAlert} />
            </WithAuthenticationMiddleware>
          }
        />

        <Route
          path="service-orders"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <ServiceOrders loading={setLoading} alert={setAlert} />
            </WithAuthenticationMiddleware>
          }
        />
      </Routes>
    );
  };

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
              [
                "error",
                "route-error",
                "database-error",
                "existence-error",
              ].includes(alert.severity)
                ? "error"
                : alert.severity
            }
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <NavbarNavigation />

      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
