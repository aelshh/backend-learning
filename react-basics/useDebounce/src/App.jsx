import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useRef } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value); // Here once the useDebounced is called it's value is set and thereafter on every render it persists it's previous value, the value can be only changed upon re-renders by a setDebounceValue function

  useEffect(() => {
    let clock = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(clock);
    };
  }, [value, delay]);
  return debouncedValue;
}

function App() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 200);
  useEffect(() => {
    console.log("Expensive Operation");
  }, [debouncedValue]);
  return (
    <>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
    </>
  );
}

export default App;
