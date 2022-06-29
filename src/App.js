import React from "react";

import { FeedbackProvider } from "./util/feedback";

import Page from "./components/page";

const App = () => {
  // the `Page` component is not responsible for modals used by
  // dynamic components so it must be wrapped in a Provider.
  // see: github.com/llGaetanll/modal-handler
  return (
    <FeedbackProvider>
      {/* <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center"
        }}
      > */}
      <Page />
      {/* </div> */}
    </FeedbackProvider>
  );
};

export default App;
