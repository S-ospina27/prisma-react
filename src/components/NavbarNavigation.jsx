import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import session, { navigationLinks, remove } from "../tools/SessionSettings";
// import RouteListNavigation from "../tools/RouteListNavigation";

// import logo from "./../assets/img/logo-transparente.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import AndroidIcon from "@mui/icons-material/Android";

function NavbarNavigation() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [actualSession, setActualSession] = useState(session());
  // const [links, setLinks] = useState(navigationLinks());
  const [anchor, setAnchor] = useState("left");
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const closeSession = () => {
  //   setActualSession(false);
  //   // setLinks(RouteListNavigation.offline);
  //   remove("jwt");
  //   navigate("/");
  // };

  // const updateSession = () => {
  //   setActualSession(true);
  //   setLinks(navigationLinks());
  //   navigate("/dashboard");
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="blue-quinary">
        <Toolbar>
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

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box
              sx={{
                paddingTop: 0,
                width: 250,
                height: "100%",
              }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List
                subheader={
                  <Box sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
                    {/* <img
                      src={log}
                      width={190}
                      height={65}
                      style={{ padding: 5 }}
                      loading={"lazy"}
                    /> */}
                  </Box>
                }
              >
                <Divider />
              </List>
            </Box>
          </SwipeableDrawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"Hermeco"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarNavigation;
