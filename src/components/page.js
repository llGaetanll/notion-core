import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

// this object describes the data on this page
const layout = {};

// this element shows up at the bottom of every page to add a new component
const Add = props => {
  return <button>add</button>;
};

// There can only be one page at a time,
// but there can be more than one draggable per page
const Page = ({ children, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Add />
        </div>
      )}
    </Droppable>
  );
};

export default Page;
