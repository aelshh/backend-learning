import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [currentPost, setCurrentPost] = useState(1);
  const { data, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${currentPost} `,
    10
  );
  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <div>{data.title}</div>
      <br />

      <button onClick={() => setCurrentPost(1)}>Post 1</button>

      <button onClick={() => setCurrentPost(2)}>Post 2</button>

      <button onClick={() => setCurrentPost(3)}>Post 3</button>
    </>
  );
}

// function Counter() {
//   const { count, increaseCount } = useCounter();
//   return <button onClick={increaseCount}>Increase {count}</button>;
// }

export default App;
