import React, { useState, useEffect, useRef, cloneElement } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Box,
  Snackbar,
  Dialog as MuiDialog,
  Menu as MuiMenu
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { isEmptyObj } from "../../util/util";

const useStyles = makeStyles(theme => ({
  alertList: {
    display: "inline-flex",
    flexDirection: "column-reverse",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  alert: {
    position: "relative",
    margin: theme.spacing(2),
    marginTop: 0,

    transitionDuration: "0.5s",
    transform: "none", // undo styles applied by MUI
    left: 0,
    bottom: 0
  },
  anchor: ({ position }) => ({
    position: "absolute",
    width: 0,
    height: 0,

    top: position?.top,
    left: position?.left
  })
}));

export const AlertList = ({ alerts, remAlert }) => {
  const classes = useStyles();

  // this list contains all currently visible alerts.
  // it's updated whenever the context's alert change
  const alertList = Object.keys(alerts).map(key => ({
    ...alerts[key],
    alertKey: key
  }));

  return (
    <Box className={classes.alertList}>
      {alertList.map(alert => (
        <Alert key={alert.alertKey} remAlert={remAlert} {...alert} />
      ))}
    </Box>
  );
};

export const Alert = ({ alertKey: key, msg, severity, remAlert, params }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    // hide the alert visually
    setOpen(false);
  };

  // remove the alert from the list once exit animation is done
  const handleExited = () => remAlert(key);

  const { lifetimeMS } = params;

  return (
    <Snackbar
      open={open}
      autoHideDuration={lifetimeMS}
      onClose={handleClose}
      onExited={handleExited}
      className={classes.alert}
    >
      <MuiAlert elevation={3} variant="filled" severity={severity}>
        {msg}
      </MuiAlert>
    </Snackbar>
  );
};

export const Dialog = ({ children, onClose, remDialog }) => {
  const [open, setOpen] = useState(false);

  // if children are defined, display the element
  useEffect(() => {
    setOpen(Boolean(children && !isEmptyObj(children)));
  }, [children]);

  const handleClose = event => {
    setOpen(false);

    onClose(event);
  };

  const handleExited = () => remDialog();

  if (!children) return <></>;

  return (
    <MuiDialog
      open={open}
      onClose={() => handleClose(null)}
      onExited={handleExited}
    >
      {/* here no need for `cloneElement` since Dialogs don't use refs */}
      {<children.type {...children.props} onClose={handleClose} />}
    </MuiDialog>
  );
};

export const Menu = ({
  anchor: customAnchor,
  position,
  children,
  onClose,
  remMenu
}) => {
  const classes = useStyles({ position });
  const [open, setOpen] = useState(false);
  const anchor = useRef();

  // update visibility based on anchor or position
  useEffect(() => {
    setOpen(Boolean(anchor.current) || Boolean(position?.top));
  }, [customAnchor, anchor, position]);

  const handleClose = event => {
    setOpen(false);

    onClose(event);
  };

  const handleExited = () => remMenu();

  return (
    <>
      {/* This is the default anchor */}
      <div ref={anchor} className={classes.anchor} />
      {children && (
        <MuiMenu
          anchorEl={customAnchor || anchor.current}
          open={open}
          onClose={() => handleClose(null)}
          onExited={handleExited}
        >
          {/* Allow the passing in of props directly from the setMenu function */}
          {/* cloneElement also forwards the refs, which is necessary for a Menu */}
          {cloneElement(children, { onClose: handleClose })}
        </MuiMenu>
      )}
    </>
  );
};
