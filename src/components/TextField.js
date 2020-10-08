import React, { useEffect, useRef } from "react";
import ComponentWrapper from './index';

import {
  Typography,
  InputBase as MuiInputBase
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  display: {

  },
  edit: {

  }
}));

const TextDisplayComponent = ({ text, setComponentMode, ...props }) => {
  const classes = useStyles();

  // when the user hovers over the element
  // switch to edit mode
  const handleEdit = () =>
    setComponentMode("edit");

  return (
    <Typography 
      onMouseEnter={handleEdit} 
      className={classes.display} 
      {...props}
    >
      {text}
    </Typography>
  );
}

const TextEditComponent = ({ text = '', setText, setComponentMode, ...props }) => {
  const ref = useRef();
  const classes = useStyles();
  
  // focus the input ref
  useEffect(() => {
    ref.current.focus();
  })

  const handleEdit = event => setText(event.target.value);

  return (
    <MuiInputBase
      className={classes.edit}
      onChange={handleEdit}
      value={text}
      inputRef={ref}
      {...props}
    />
  );
}

const TextField = ({ text, setText, displayProps, editProps }) =>
  <ComponentWrapper 
    displayComponent={<TextDisplayComponent />}
    editComponent={<TextEditComponent />}
    displayProps={{
      text,
      ...displayProps
    }}
    editProps={{
      text,
      setText,
      ...editProps
    }}
    // default mode of the component
    // this can be changed from within 
    // the component as both the edit 
    // and display component have access
    // to `setComponentMode`
    mode="display" 
  />

export default TextField;
