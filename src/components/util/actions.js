import React, { useContext } from "react";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import { MenuItem, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { setMenu, FeedbackContext } from "../../util/feedback";

const useStyles = makeStyles(theme => ({
  action: {
    // opacity: 0,

    position: "absolute",
    transform: "translateX(-100%)",

    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));
const ComponentList = () => {
  return <MenuItem>test</MenuItem>;
};
/* Actions is the button that appears on the left of every Component.
 * It's used for drag and drop, and changing the state of the Component.
 */
const Actions = () => {
  const classes = useStyles();
  const { setMenu } = useContext(FeedbackContext);

  const handleClick = event => setMenu(event.currentTarget, <ComponentList />);

  return (
    <IconButton className={classes.action} onClick={handleClick}>
      <DragIndicatorIcon />
    </IconButton>
  );
};

export default Actions;
