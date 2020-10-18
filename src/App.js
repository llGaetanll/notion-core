import React from "react";

import { FeedbackProvider } from "./util/feedback";

import Page from "./components/Page";

const App = () => {
  // the `Page` component is not responsible for modals used by
  // dynamic components so it must be wrapped in a Provider.
  // see: github.com/llGaetanll/modal-handler
  return (
    <FeedbackProvider>
      <Page />
    </FeedbackProvider>
  );
};

export default App;
