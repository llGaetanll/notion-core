import RGL, { WidthProvider } from "react-grid-layout";

const GridLayout = WidthProvider(RGL);

const TestGrid = () => {
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <GridLayout
      className="layout"
      margin={[8, 8]}
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      resizeHandles={["ne"]}
      // allowCollision={true}
    >
      <div key="a">a</div>
      <div key="b">b</div>
      <div key="c">c</div>
    </GridLayout>
  );
};

export default TestGrid;
