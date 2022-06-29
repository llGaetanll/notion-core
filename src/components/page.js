import React, { useState, cloneElement } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Example from "./dynamic/Example";
import TextField from "./dynamic/TextField";
import Actions from "./util/actions";

// example dynamic component
// const MyField = () => <TextField text="hello world" setText={() => {}} />;
const MyField = () => <Example />;

// gen dummy data
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    component: <MyField />,
  }));

/**
 * Reorders items in one list. Swaps start index with end index
 */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  // deep copy source and dest arrays
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  // remove the index from the source
  const [removedIndex] = sourceClone.splice(droppableSource.index, 1);

  // add the index to the destination
  destClone.splice(droppableDestination.index, 0, removedIndex);

  return [sourceClone, destClone];
};

const WIDTH = 16;

const getDragItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: `0 64px`,
  // margin: isDragging ? `0 ${2 * grid}px ${grid}px ${2 * grid}px` : `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getColumnStyle = (isDragging, hasItems) => {
  console.log(isDragging);

  return {
    background: hasItems ? "transparent" : "lightBlue",
    border: "1px solid black",

    flex: hasItems ? 1 : 0,
    width: hasItems ? "auto" : WIDTH,
    // paddingRight: isDragging ? 0 : WIDTH

    // width: hasItems ? "auto" : WIDTH,
    // display: "flex",
    // flex: 1,
    // flex: hasItems ? 1 : 0,
    // flexDirection: "column"
  };
};

const Column = ({ column, index, onAddElement }) => {
  return (
    <Droppable key={index} droppableId={`${index}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getColumnStyle(snapshot.isDragging, column.length > 0)}
          {...provided.droppableProps}
        >
          {column.map((dynComp, j) => (
            <Draggable key={dynComp.id} draggableId={dynComp.id} index={j}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getDragItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <Actions />
                  {/* clone the given element to forward any refs */}
                  {cloneElement(dynComp.component, {})}
                </div>
              )}
            </Draggable>
          ))}
          {/* {column.length > 0 && provided.placeholder} */}
          {provided.placeholder}
          {column.length > 0 && (
            <button onClick={() => onAddElement(index)}>add element</button>
          )}
        </div>
      )}
    </Droppable>
  );
};

// There can only be one page at a time,
// but there can be more than one droppable per page
const Page = () => {
  const [columns, setColumns] = useState([getItems(5), getItems(3, 5)]);

  const handleDragEnd = ({ source, destination }) => {
    // source column
    const sourceIndex = +source.droppableId;
    // destination column if destination is defined
    const destIndex = +destination?.droppableId;

    // copy object
    let newColumns = [...columns];

    // if we're dropping the node in the same column
    if (destination && sourceIndex === destIndex)
      newColumns[sourceIndex] = reorder(
        columns[sourceIndex],
        source.index,
        destination.index
      );

    // if we're dropping the node in a different column
    if (destination && sourceIndex !== destIndex) {
      // move node from source to destination column, returns updated columns
      const [sourceColumn, destColumn] = move(
        columns[sourceIndex],
        columns[destIndex],
        source,
        destination
      );

      // update resulting columns
      newColumns[sourceIndex] = sourceColumn;
      newColumns[destIndex] = destColumn;
    }

    // clear any potentially empty columns
    newColumns = newColumns.filter((group) => group.length);
    setColumns(newColumns);
  };

  // const handleAddColumn = () =>
  //   setColumns(col => [[], ...col.map(c => [c, []]).flat()]);

  const handleAddColumn = () => setColumns((col) => [...col]);

  const handleAddElement = (index) => {
    const cols = Array.from(columns);

    cols[index] = [
      ...cols[index],
      {
        id: `item-${new Date().getTime()}`,
        component: <MyField />,
      },
    ];

    setColumns(cols);
  };

  return (
    <DragDropContext
      onBeforeCapture={handleAddColumn}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex" }}>
        {columns.map((column, i) => (
          <Column column={column} index={i} onAddElement={handleAddElement} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Page;
