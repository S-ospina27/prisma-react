import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import RouteListNavigation from "./tools/RouteListNavigation";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import session, {
  getJWT,
  getRol,
  navigationLinks,
  remove,
} from "./tools/SessionSettings";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import prisma from "./../assets/img/prisma.png";

function NavbarNavigation({ userSession }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [links, setLinks] = useState(navigationLinks());
  const [anchor, setAnchor] = useState("left");
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (userSession && !clicked) {
      setLinks(navigationLinks());
      setClicked(true);
    }

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const closeSession = () => {
    setLinks(RouteListNavigation.offline);
    remove("jwt");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="blue">
        <Toolbar>
          {session() && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box
              sx={{
                paddingTop: 0,
                width: 260,
                height: "100%",
              }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List
                subheader={
                  <Box sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
                    <img
                      src={prisma}
                      width={208}
                      height={40}
                      style={{ padding: 5 }}
                      loading={"lazy"}
                    />
                  </Box>
                }
              >
                {session() && (
                  <>
                    <Box mb={3}>
                      <Divider>
                        <Chip
                          label={getRol(getJWT("idroles"), true)}
                          color={"blue"}
                        />
                      </Divider>
                    </Box>

                    {links.map((row, keyRow) => (
                      <div key={keyRow}>
                        <ListSubheader color="inherit">
                          {row.label}
                        </ListSubheader>

                        {row.childs.map((child, keyChild) => (
                          <ListItem
                            key={`container-${keyChild}`}
                            selected={child.url === location.pathname}
                            disablePadding
                          >
                            <ListItemButton component={Link} to={child.url}>
                              {child.icon && (
                                <ListItemIcon>{child.icon}</ListItemIcon>
                              )}

                              <ListItemText primary={child.label} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </div>
                    ))}
                  </>
                )}

                {session() && (
                  <>
                    <ListSubheader>{"CUENTA"}</ListSubheader>

                    <ListItem disablePadding>
                      <ListItemButton onClick={closeSession}>
                        <ListItemIcon>
                          <MeetingRoomIcon color="warning" />
                        </ListItemIcon>

                        <ListItemText primary={"Cerrar Sesión"} />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </SwipeableDrawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"PRISMA"}
          </Typography>

          {!session() && (
            <>
              <Button color="inherit" component={Link} to={"/"}>
                HOME
              </Button>

              <Button color="inherit" component={Link} to={"/auth/login"}>
                INGRESAR
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarNavigation;
