import { useState, cloneElement } from "react";

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

// There can only be one page at a time,
// but there can be more than one droppable per page
const Page = ({ children }) => {
  return <div>{children}</div>;
};

export default Page;
