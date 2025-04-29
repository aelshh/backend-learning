import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { usePrev } from "./hooks/usePrev";

function App() {
  const [count, setCount] = useState(0);
  const previousValue = usePrev(count);

  return (
    <>
      <h1>{count}</h1>
      <p>Previous value of count was {previousValue}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </>
  );
}

export default App;
