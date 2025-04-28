import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const inputRef = useRef();
  let [timer, setTimer] = useState(0);
  let count = useRef(0);

  return (
    <>
      {/* <h1>Form</h1>
      <input ref={inputRef} type="text" />
      <input type="text" />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        Submit
      </button> */}
      <h1>{timer}</h1>
      <button
        onClick={() => {
          let value = setInterval(() => {
            setTimer((t) => t + 1);
          }, 1000);
          count.current = value;
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          clearInterval(count.current);
        }}
      >
        Stop
      </button>
    </>
  );
}

export default App;
