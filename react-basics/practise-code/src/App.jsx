import { useEffect, useState } from "react";
import { PostComponent } from "./Post";
import profile from "./assets/profile.jpg";

import "./App.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Card> Hey there</Card>
      <Card></Card>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        backgroundColor: "black",
        borderRadius: 10,
        color: "white",
        padding: 10,
        margin: 10,
      }}
    >
      {children}
    </div>
  );
}
export default App;
