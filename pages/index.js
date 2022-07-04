import { useState } from "react";

import Page from "../components/Page";
import TextField from "../components/dynamic/TextField";

const randData = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
  "nostrud exercitation",
];

const Index = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: 800,
        margin: "0 auto",
      }}
    >
      <h1>notion/core</h1>
      <div
        style={{
          flex: 1,
          background: "#ddd",
        }}
      >
        <Page>
          {randData.map((line) => (
            <TextField key={line} defText={line} />
          ))}
        </Page>
      </div>
    </div>
  );
};

export default Index;
