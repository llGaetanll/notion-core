import React, { useState } from 'react';

import { FeedbackProvider } from "./util/feedback";

import TextField from './components/TextField';

const App = () => {
  const [text, setText] = useState('hello world');

  return (
    <div style={{height: '100%', width: 400, margin: '0 auto'}}>
      <FeedbackProvider>
        <h1>notion/core</h1>
        <TextField text={text} setText={setText} />
      </FeedbackProvider>
    </div>
  );
}

export default App;

