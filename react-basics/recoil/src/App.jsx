import "./App.css";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atom/counter";

function App() {
  return (
    <>
      <RecoilRoot>
        <Counter></Counter>
      </RecoilRoot>
    </>
  );
}

function Counter() {
  return (
    <div>
      <ValueDisplay></ValueDisplay>
      <Increase></Increase>
      <Decrease></Decrease>
    </div>
  );
}

function ValueDisplay() {
  const value = useRecoilValue(counterAtom);
  return <div>{value}</div>;
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <button onClick={() => setCount((count) => count + 1)}>Increase</button>
  );
}
function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <button onClick={() => setCount((count) => count - 1)}>Decrease</button>
  );
}
export default App;
