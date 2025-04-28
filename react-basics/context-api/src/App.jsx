import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createContext, useContext } from "react";

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbState, setBulbState] = useState(true);
  return (
    <BulbContext.Provider
      value={{
        bulbState: bulbState,
        setBulbState: setBulbState,
      }}
    >
      {children}
    </BulbContext.Provider>
  );
}

function App() {
  return (
    <>
      <Bulb></Bulb>
    </>
  );
}

function Bulb() {
  return (
    <div>
      <BulbProvider>
        <BulbState></BulbState>
        <ToggleBulbState></ToggleBulbState>
      </BulbProvider>
    </div>
  );
}

function BulbState() {
  const { bulbState } = useContext(BulbContext);
  return <div>{bulbState ? "Bulb on" : "Bulb Off"}</div>;
}

function ToggleBulbState() {
  const { bulbState, setBulbState } = useContext(BulbContext);
  return (
    <button
      onClick={() => {
        setBulbState(!bulbState);
      }}
    >
      Toggle the bulb
    </button>
  );
}

export default App;
