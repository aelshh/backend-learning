import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <h1>Hey there</h1>
      <Counter></Counter>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((previousValue) => previousValue + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
