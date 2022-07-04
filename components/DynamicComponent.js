import React, { useState, useContext, useEffect } from "react";
import { DraggableCore } from "react-draggable"; // The default

const ComponentList = () => {
  return <MenuItem>test</MenuItem>;
};

/* Actions is the button that appears on the left of every Component.
 * It's used for drag and drop, and changing the state of the Component.
 */
const Actions = ({ handleGrab, handleLetGo }) => {
  /*
  const classes = useStyles();
  const { setMenu } = useContext(FeedbackContext);
  */

  const handleClick = () => console.log("click!");

  return (
    <span
      className="handle"
      css={{
        width: 20,
        cursor: "grab",

        "&: active": {
          cursor: "grabbing",
        },
      }}
      onMouseDown={handleGrab}
      onMouseUp={handleLetGo}
      onClick={handleClick}
    />
  );

  /*
  const handleClick = (event) =>
    setMenu(event.currentTarget, <ComponentList />);

  return (
    <IconButton className={classes.action} onClick={handleClick}>
      <DragIndicatorIcon />
    </IconButton>
  );
  */
};

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
const DynamicComponent = ({ displayComponent, editComponent, ...props }) => {
  const [componentMode, setComponentMode] = useState();
  const [dragging, setDragging] = useState(false);

  // mode is passed from the outside. When it is changed, the component updates
  const { displayProps, editProps, defMode } = props;

  // when the mode of the component changes from the outside
  // update the mode
  useEffect(() => {
    if (defMode !== componentMode) {
      console.log("updating mode to:", defMode);
      setComponentMode(defMode);
    }
  }, [defMode]);

  // If no mode is specified, the element does not render
  if (!componentMode) return <></>;

  const componentProps = componentMode === "display" ? displayProps : editProps;

  const handleEdit = () => {
    setComponentMode("edit");
  };

  const handleDisplay = () => {
    setComponentMode("display");
  };

  const handleGrab = () => {
    setDragging(true);
  };

  const handleLetGo = () => {
    setDragging(false);
  };

  console.log(dragging);

  const Component = React.cloneElement(
    componentMode === "display" ? displayComponent : editComponent,
    // props passed to the cloned component. Also contains `setComponentMode` so the component can change
    // its state from within
    { ...componentProps, setComponentMode }
  );

  return (
    <DraggableCore handle=".handle">
      <div
        css={{
          display: "flex",

          paddingTop: 8,
          paddingBottom: 8,

          // background: "red",
          // border: "1px solid blue",
        }}
        onMouseEnter={handleEdit}
        onMouseLeave={handleDisplay}
      >
        <Actions handleGrab={handleGrab} handleLetGo={handleLetGo} />
        {Component}
      </div>
    </DraggableCore>
  );
};

export default DynamicComponent;
