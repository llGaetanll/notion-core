import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FeedbackProvider } from "./util/feedback";

import Page from "./components/page";
import TextField from "./components/dynamic/TextField";

const defList = Array.from({ length: 10 }, (_, i) => ({
  id: `child-${i + 1}`,
  content: `child-${i + 1}`
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const App = () => {
  const [text, setText] = useState("Hello World");
  const [list, setList] = useState(defList);

  const onDragEnd = res => {
    if (!res.destination) return;

    const items = reorder(list, res.source.index, res.destination.index);

    setList(items);
  };

  return (
    <div
      style={{
        height: "100%",
        width: 400,
        margin: "0 auto"
      }}
    >
      <FeedbackProvider>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* <Page id="sdf">
            <TextField text={text} setText={setText} />
          </Page> */}
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((element, i) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {element.content}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </FeedbackProvider>
    </div>
  );
};

export default App;
