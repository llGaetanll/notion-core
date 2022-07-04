import { useRef, useState, cloneElement } from "react";
import DynamicComponent from "../DynamicComponent";

/*
import { Typography, InputBase as MuiInputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
*/

/*
const useStyles = makeStyles((theme) => ({
  display: {
    width: "100%",
    minHeight: "inherit",
    background: "lightblue",

    display: "flex",
    alignItems: "center",
  },
  edit: {
    width: "100%",
    minHeight: "inherit",
    background: "lightgreen",
  },
}));
*/

const TextDisplayComponent = ({ text, setComponentMode, ...props }) => {
  return (
    <p css={{ margin: 0, minHeight: 20 }} {...props}>
      {text}
    </p>
  );
};

const TextEditComponent = ({
  text = "",
  setText,
  setComponentMode,
  ...props
}) => {
  const ref = useRef();

  // focus the input ref
  // useEffect(() => {
  //   ref.current.focus();
  // });

  const handleEdit = (event) => setText(event.target.value);

  return (
    <input
      css={{ all: "unset", flex: 1, background: "white" }}
      onChange={handleEdit}
      value={text}
      inputRef={ref}
      {...props}
    />
  );
};

const TextField = ({ defText, displayProps, editProps }) => {
  const [text, setText] = useState(defText);

  return (
    <DynamicComponent
      displayComponent={<TextDisplayComponent />}
      editComponent={<TextEditComponent />}
      displayProps={{
        text,
        ...displayProps,
      }}
      editProps={{
        text,
        setText,
        ...editProps,
      }}
      // default mode of the component
      // this can be changed from within
      // the component as both the edit
      // and display component have access
      // to `setComponentMode`
      defMode="display"
    />
  );
};

export default TextField;
