import React, { useState } from "react";

import { FeedbackProvider } from "./util/feedback";

import Page from "./components/page";
import SideBar from "./components/sidebar";

import { Box } from "@material-ui/core";


const App = () => {
  const [sideBarSize, setSideBarSize] = useState(225);

  return (
    <Box>
      <SideBar size={sideBarSize} onResize={(size) => setSideBarSize(size)} />
      <Page />
    </Box>
  );
};

export default App;
