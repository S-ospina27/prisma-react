import "./assets/css/app.css";
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
import ServiceOrders from "./pages/ServiceOrders";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ServiceRequest from "./pages/ServiceRequest";
import TechnicalInventory from "./pages/TechnicalInventory";
import SpareParts from "./pages/SpareParts";
import Dashboard from "./pages/Dashboard";
import ApplicationOrderForm from "./pages/ApplicationOrderForm";
import Payments from "./pages/Payments";

import NoAuthenticationMiddleware from "./middleware/NoAuthenticationMiddleware";
import WithAuthenticationMiddleware from "./middleware/WithAuthenticationMiddleware";

import session from "./components/tools/SessionSettings";
import NotRolMiddleware from "./middleware/NotRolMiddleware";
import AdministratorMiddleware from "./middleware/AdministratorMiddleware";

function App() {
  const [userSession, setUserSession] = useState(session());
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
          autoHideDuration={alert.time ? alert.time : 5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;

            setAlert({
              open: false,
              severity: "",
              message: "",
            });
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
                "session-error",
              ].includes(alert.severity)
                ? "error"
                : alert.severity
            }
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <NavbarNavigation userSession={userSession} />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route
          path="dashboard"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <Dashboard loading={setLoading} alert={setAlert} />
            </WithAuthenticationMiddleware>
          }
        />

        <Route path="auth">
          <Route
            path="login"
            element={
              <NoAuthenticationMiddleware>
                <Login
                  loading={setLoading}
                  alert={setAlert}
                  userSession={setUserSession}
                />
              </NoAuthenticationMiddleware>
            }
          />
        </Route>

        <Route
          path="users"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <AdministratorMiddleware>
                <Users loading={setLoading} alert={setAlert} />
              </AdministratorMiddleware>
            </WithAuthenticationMiddleware>
          }
        />

        <Route
          path="products"
          element={
            <WithAuthenticationMiddleware loading={setLoading} alert={setAlert}>
              <AdministratorMiddleware>
                <Products loading={setLoading} alert={setAlert} />
              </AdministratorMiddleware>
            </WithAuthenticationMiddleware>
          }
        />

        <Route path="service">
          <Route
            path="application-order-form/:idusers"
            element={
              <ApplicationOrderForm loading={setLoading} alert={setAlert} />
            }
          />

          <Route
            path="orders"
            element={
              <WithAuthenticationMiddleware
                loading={setLoading}
                alert={setAlert}
              >
                <NotRolMiddleware roles={[2, 3]}>
                  <ServiceOrders loading={setLoading} alert={setAlert} />
                </NotRolMiddleware>
              </WithAuthenticationMiddleware>
            }
          />

          <Route
            path="request"
            element={
              <WithAuthenticationMiddleware
                loading={setLoading}
                alert={setAlert}
              >
                <NotRolMiddleware roles={[2, 3, 4]}>
                  <ServiceRequest loading={setLoading} alert={setAlert} />
                </NotRolMiddleware>
              </WithAuthenticationMiddleware>
            }
          />

          <Route
            path="spare-parts"
            element={
              <WithAuthenticationMiddleware
                loading={setLoading}
                alert={setAlert}
              >
                <NotRolMiddleware roles={[2, 3, 4]}>
                  <SpareParts loading={setLoading} alert={setAlert} />
                </NotRolMiddleware>
              </WithAuthenticationMiddleware>
            }
          />

          <Route
            path="technical-inventory"
            element={
              <WithAuthenticationMiddleware
                loading={setLoading}
                alert={setAlert}
              >
                <NotRolMiddleware roles={[2, 3, 4]}>
                  <TechnicalInventory loading={setLoading} alert={setAlert} />
                </NotRolMiddleware>
              </WithAuthenticationMiddleware>
            }
          />
          <Route
            path="payments"
            element={
              <WithAuthenticationMiddleware
                loading={setLoading}
                alert={setAlert}
              >
                <NotRolMiddleware roles={[2, 3, 4]}>
                  <Payments loading={setLoading} alert={setAlert} />
                </NotRolMiddleware>
              </WithAuthenticationMiddleware>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
