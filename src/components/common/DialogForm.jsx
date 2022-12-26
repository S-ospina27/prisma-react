import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  DialogContent as DialogContentBody,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogForm(props) {
  const [disabledEvent, setDisabledEvent] = useState(false);

  const handleClose = () => {
    props.setOpen(false);
  };

  const AppBarDialog = (props) => {
    return (
      <AppBar sx={{ position: "relative" }} color={"primary"}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.title}
          </Typography>

          {!disabledEvent ? (
            props.button.type === "submit" ? (
              <Button type="submit" color="inherit">
                {props.button.label}
              </Button>
            ) : (
              <Button type="button" color="inherit" onClick={handleClose}>
                {props.button.label}
              </Button>
            )
          ) : null}
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {[undefined, null].includes(props.button.onSubmit) ? (
        <>
          <AppBarDialog title={props.title} button={props.button} />
          <DialogContentBody>{props.content}</DialogContentBody>
        </>
      ) : (
        <form onSubmit={props.button.onSubmit}>
          <AppBarDialog title={props.title} button={props.button} />
          <DialogContentBody>{props.content}</DialogContentBody>
        </form>
      )}
    </Dialog>
  );
}

export default DialogForm;
