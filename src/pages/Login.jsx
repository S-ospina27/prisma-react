import { Box, Button, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFieldFilled from "../components/common/TextFieldFilled";

import RoutesList from "../components/tools/RoutesList";
import { set } from "../components/tools/SessionSettings";

import logo from "./../assets/img/prisma.png";

function Login({ loading, alert }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [users_email, setUsers_email] = useState("");
  const [users_password, setUsers_password] = useState("");
  const [count_errors, setCount_errors] = useState(0);

  const handleAuth = (e) => {
    e.preventDefault();
    loading(true);

    const form = new FormData();
    form.append("users_email", users_email);
    form.append("users_password", SHA256(users_password));
    form.append("count_errors", count_errors);

    axios.post(RoutesList.api.auth.login, form).then((res) => {
      loading(false);
      alert({
        open: true,
        message: res.data.message,
        severity: res.data.status,
      });

      if (res.data.status === "success") {
        set("jwt", res.data.data.jwt);
        setCount_errors(0);
        navigate(location.pathname === "/auth/login" ? "/" : location.pathname);
      } else if (res.data.status === "error") {
        setCount_errors(count_errors + 1);
      } else if (res.data.status === "existence-error") {
        setCount_errors(0);
      }

      if (count_errors >= 3) {
        setCount_errors(0);
      }
    });
  };

  return (
    <form onSubmit={handleAuth}>
      <Container>
        <Box my={5}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              lg={4}
              p={3}
              mx={"auto"}
              my={5}
              sx={{ borderRadius: 1, border: 1, borderColor: "grey.300" }}
            >
              <Box
                my={3}
                component={"img"}
                alt={"Prisma"}
                src={logo}
                sx={{
                  width: "100%",
                }}
              />

              <Divider />

              <Box my={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextFieldFilled
                      label={"Correo"}
                      type={"email"}
                      value={users_email}
                      setValue={setUsers_email}
                      required
                      color="dark-blue"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextFieldFilled
                      label={"Contraseña"}
                      type={"password"}
                      value={users_password}
                      setValue={setUsers_password}
                      required
                      color="dark-blue"
                    />
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Button
                    type={"submit"}
                    variant="contained"
                    color="dark-blue"
                    size="large"
                    sx={{ width: "100%" }}
                  >
                    {"Ingresar"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default Login;
