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
import { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogForm({
  open,
  setOpen,
  button,
  title,
  content,
  clean,
}) {
  const [disabledEvent, setDisabledEvent] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const AppBarDialog = () => {
    return (
      <AppBar sx={{ position: "sticky" }} color={"blue"}>
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
            {title}
          </Typography>

          {!disabledEvent ? (
            button.type === "submit" ? (
              <Button type="submit" color="inherit">
                {button.label}
              </Button>
            ) : (
              <Button type="button" color="inherit" onClick={handleClose}>
                {button.label}
              </Button>
            )
          ) : null}
        </Toolbar>
      </AppBar>
    );
  };

  useEffect(() => {
    clean && clean();
  }, [ open]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {[undefined, null].includes(button.onSubmit) ? (
        <>
          <AppBarDialog />
          <DialogContentBody>{content}</DialogContentBody>
        </>
      ) : (
        <form onSubmit={button.onSubmit}>
          <AppBarDialog />
          <DialogContentBody>{content}</DialogContentBody>
        </form>
      )}
    </Dialog>
  );
}

export default DialogForm;
