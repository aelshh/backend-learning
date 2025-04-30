import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useRecoilValue,
  RecoilRoot,
  useSetRecoilState,
  useRecoilState,
} from "recoil";
import { messageAtom, newtowrkAtom, notificationAtom } from "./atoms";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RecoilRoot>
        <Notifications></Notifications>
        <MessageUpdater></MessageUpdater>
      </RecoilRoot>
    </>
  );
}

function Notifications() {
  const newtworks = useRecoilValue(newtowrkAtom);
  const [notifications, setNotifications] = useRecoilState(notificationAtom);
  const messages = useRecoilValue(messageAtom);

  return (
    <div>
      <button>Home</button>
      <button>Network({newtworks})</button>
      <button onClick={() => setNotifications((n) => n - 1)}>
        Notification({notifications > 99 ? "99+" : notifications})
      </button>
      <button>Messages({messages})</button>
    </div>
  );
}

function MessageUpdater() {
  const setMessage = useSetRecoilState(messageAtom);
  return <button onClick={() => setMessage((m) => m + 1)}>Me</button>;
}

export default App;
