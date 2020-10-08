import React, { useState, useContext, useEffect } from "react";

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import {
  Box,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { setMenu, FeedbackContext } from '../util/feedback';

const useStyles = makeStyles(theme => ({
  component: {
    display: 'flex',
    // size padding
    padding: `0 ${theme.spacing(1)}px`,

    // display actions menu on hover
    '&:hover': {
      '$action': {
        opacity: 1
      },

      backgroundColor: theme.palette.grey[100]
    },

    minHeight: 48,
    alignItems: 'center'
  },
  action: {
    opacity: 0,

    position: 'absolute',
    transform: 'translateX(-100%)',

    "&:hover": {
      backgroundColor: "transparent"
    }
  },
}));

const ComponentList = () => {
  return (
    <MenuItem>
      test
    </MenuItem>
  )
}

/* Actions is the button that appears on the left of every Component.
 * It's used for drag and drop, and changing the state of the Component.
 */
const Actions = () => {
  const classes = useStyles();
  const { setMenu } = useContext(FeedbackContext);

  const handleClick = event =>
    setMenu(event.currentTarget, <ComponentList />);

  return (
    <IconButton className={classes.action} onClick={handleClick}>
      <DragIndicatorIcon />
    </IconButton>
  )
}

/* Components have 2 default modes, display and edit. If no mode is specified, the element does not render 
 *  The Component's state is shared across all modes
 *  - the component's state is provided to `displayComponent`
 *  - the mutations are provided to `editComponent`
 * 
 *  `displayComponent` & `editComponent` are the components to be rendered in each state
 *  `displayComponent` is passed the state of the component
 *  `editComponent` is passed both the state and the mutations.
 *
 *  ComponentWrapper is not responsible for any component state, which would be handled by a higher order
 *  component.
 */
const ComponentWrapper = ({ displayComponent, editComponent, ...props }) => {
  const classes = useStyles();
  const [componentMode, setComponentMode] = useState();

  // mode is passed from the outside. When it is changed, the component updates
  const { displayProps, editProps, mode } = props;

  // when the mode of the component changes from the outside
  // update the mode
  useEffect(() => {
    if (mode !== componentMode) {
      console.log('updating mode to:', mode);
      setComponentMode(mode);
    }
  }, [mode])

  // If no mode is specified, the element does not render
  if (!componentMode)
    return <></>;

  const componentProps = 
    componentMode === 'display' 
    ? displayProps 
    : editProps;

  const Component = 
    React.cloneElement(
      componentMode === 'display'
      ? displayComponent 
      : editComponent, 
      // props passed to the cloned component. Also contains `setComponentMode` so the component can change
      // its state from within
      { ... componentProps, setComponentMode }
    );

  return (
    <Box className={classes.component}>
      <Actions />
      {Component}
    </Box>
  );
}

export default ComponentWrapper;
