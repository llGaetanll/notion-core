import React from "react";
import DynamicComponent from "../DynamicComponent";

// Here, the display component is just a simple `p` tag.
// It switches the component to edit mode when hovered
const ExampleDisplay = ({ setComponentMode, ...props }) => (
  <p
    style={{ background: "red" }}
    onMouseEnter={() => setComponentMode("edit")}
    {...props}
  >
    Display Mode
  </p>
);

// Likewise, the edit component is much the same.
// It switches the component back to display mode when user stops hovering on it
const ExampleEdit = ({ setComponentMode, ...props }) => (
  <p
    style={{ background: "green" }}
    onMouseLeave={() => setComponentMode("display")}
    {...props}
  >
    Edit Mode
  </p>
);

// This is an example DynamicComponent, as simple as it gets.
// Play around with it to see what it does
const Example = () => (
  <DynamicComponent
    displayComponent={<ExampleDisplay />}
    editComponent={<ExampleEdit />}
    // default mode of the component
    // this can be changed from within
    // the component as both the edit
    // and display component have access
    // to `setComponentMode`
    mode="display"
  />
);

export default Example;
