import { useState } from "react";

import TextField from "../components/dynamic/TextField";

const Index = () => {
  const [text, setText] = useState("hello world");

  return (
    <div style={{ height: "100%", width: 400, margin: "0 auto" }}>
      <h1>notion/core</h1>
      {/* <TextField text={text} setText={setText} /> */}
    </div>
  );
};

export default Index;
