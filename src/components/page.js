import React, { useState } from "react";
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
 * Reorders items in one list
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

const List = ({ els, index, onAddElement, col }) => {
  console.log(els);
  return (
    <Droppable
      key={index}
      droppableId={`${index}`}
      direction={col ? "vertical" : "horizontal"}
      // direction="horizontal"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{
            display: "flex",
            flexDirection: col ? "column" : "row",
            border: "1px solid black",
            flex: 1,
          }}
          {...provided.droppableProps}
        >
          {els.map((dynComp, j) => {
            const id = typeof dynComp === Array ? `array-${j}` : dynComp.id;

            return (
              <Draggable key={id} draggableId={id} index={j}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      // some basic styles to make the items look a bit nicer
                      flex: 1,
                      userSelect: "none",
                      padding: `0 64px`,
                      background: "grey",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <Actions />
                    {dynComp instanceof Array ? (
                      <List els={dynComp} index={2} col={!col} />
                    ) : (
                      <>
                        {
                          /* clone the given element to forward any refs */
                          React.cloneElement(dynComp.component, {})
                        }
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            );
          })}
          {/* {column.length > 0 && provided.placeholder} */}
          {provided.placeholder}
          {/* <button onClick={() => onAddElement(index)}>add element</button> */}
        </div>
      )}
    </Droppable>
  );
};

/*
 * Only one page at once. it can contain columns and rows
 */
const Page = () => {
  // const [column, setColumns] = useState(getItems(5));
  const [els, setEls] = useState([
    {
      id: "1",
      component: <MyField />,
    },
    {
      id: "2",
      component: <MyField />,
    },
    [
      {
        id: "3",
        component: <MyField />,
      },
      {
        id: "4",
        component: <MyField />,
      },
      {
        id: "5",
        component: <MyField />,
      },
    ],
  ]);

  /*
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
  */

  // const handleAddColumn = () =>
  //   setColumns(col => [[], ...col.map(c => [c, []]).flat()]);

  // const handleAddColumn = () => setColumns((col) => [...col]);

  const handleAddElement = (index) => {
    // const cols = Array.from(column);
    // cols[index] = [
    //   ...cols[index],
    //   {
    //     id: `item-${new Date().getTime()}`,
    //     component: <MyField />,
    //   },
    // ];
    // setColumns(cols);
  };

  return (
    <DragDropContext>
      <List els={els} index={1} col />
    </DragDropContext>
  );
};

export default Page;
