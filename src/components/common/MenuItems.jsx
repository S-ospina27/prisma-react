import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { getJWT } from "../../tools/SessionSettings";

function MenuItems(props) {
  const [buttonId, setButtonid] = useState(`btn-${props.id}`);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ItemsMenuModal = (propsMenuModal) => {
    return propsMenuModal.icon === undefined ? (
      <MenuItem
        onClick={() => {
          propsMenuModal.onClick(true);
          handleClose();
        }}
      >
        <ListItemText>{propsMenuModal.name}</ListItemText>
      </MenuItem>
    ) : (
      <MenuItem
        onClick={() => {
          propsMenuModal.onClick(true);
          handleClose();
        }}
      >
        <ListItemIcon>{propsMenuModal.icon}</ListItemIcon>
        <ListItemText>{propsMenuModal.name}</ListItemText>
      </MenuItem>
    );
  };

  const ItemsMenuUrl = (propsMenuUrl) => {
    return propsMenuUrl.icon === undefined ? (
      <MenuItem onClick={handleClose} component={Link} to={propsMenuUrl.url}>
        <ListItemText>{propsMenuUrl.name}</ListItemText>
      </MenuItem>
    ) : (
      <MenuItem onClick={handleClose} component={Link} to={propsMenuUrl.url}>
        <ListItemIcon>{propsMenuUrl.icon}</ListItemIcon>
        <ListItemText>{propsMenuUrl.name}</ListItemText>
      </MenuItem>
    );
  };

  const ItemsMenu = (propsMenu) => {
    return [null, undefined].includes(propsMenu.icon) ? (
      <MenuItem onClick={propsMenu.onClick}>
        <ListItemText>{propsMenu.name}</ListItemText>
      </MenuItem>
    ) : (
      <MenuItem onClick={propsMenu.onClick}>
        <ListItemIcon>{propsMenu.icon}</ListItemIcon>
        <ListItemText>{propsMenu.name}</ListItemText>
      </MenuItem>
    );
  };

  const getItem = (item, index) => {
    return item.type === "link" ? (
      <ItemsMenuUrl
        name={item.name}
        icon={item.icon}
        url={item.url}
        key={index}
      />
    ) : item.type === "modal" ? (
      <ItemsMenuModal
        name={item.name}
        icon={item.icon}
        onClick={item.setOpen}
        key={index}
      />
    ) : item.type === "item" ? (
      <ItemsMenu
        name={item.name}
        icon={item.icon}
        key={index}
        onClick={!item.onClick ? handleClose : item.onClick}
      />
    ) : (
      <ItemsMenu
        name={item.name}
        icon={item.icon}
        key={index}
        onClick={!item.onClick ? handleClose : item.onClick}
      />
    );
  };

  return (
    <>
      {!props.iconButton ? (
        <Button
          id={buttonId}
          aria-controls={open ? props.id : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant={props.buttonVariant}
          size={props.buttonSize}
          color={"blue"}
        >
          {props.label}
        </Button>
      ) : (
        <IconButton
          id={buttonId}
          aria-controls={open ? props.id : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size={props.buttonSize}
          color={"blue"}
        >
          {props.label}
        </IconButton>
      )}

      <Menu
        id={props.id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": buttonId,
        }}
      >
        {props.items.map((item, index) => {
          {/* if (!item.idroles) {
            return getItem(item, index);
          } else {
            return item.idroles.includes(getJWT("idroles")) && getItem(item, index);
          } */}
          return getItem(item, index);
        })}
      </Menu>
    </>
  );
}

export default MenuItems;