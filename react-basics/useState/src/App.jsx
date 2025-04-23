import { useState } from "react";
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

  function increaseCount() {
    setCount(count + 1);
  }
  function decreaseCount() {
    setCount(count - 1);
  }
  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase count</button>
      <button onClick={decreaseCount}>Decrease count</button>
      <button onClick={resetCount}>Reset count</button>
    </div>
  );
}

export default App;
