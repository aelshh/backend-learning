import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route
                path={"/neet/online-coaching"}
                element={<NeetOnline />}
              ></Route>
              <Route path={"/"} element={<JEEOnline />}></Route>
              <Route
                path={"/Boards/online-coaching"}
                element={<BoardsOnline />}
              ></Route>
              <Route path="*" element={<Error></Error>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

function Layout() {
  return (
    <div>
      <Link to={"/"}>JEE</Link>|<Link to={"/neet/online-coaching"}>NEET</Link>|
      <Link to={"/Boards/online-coaching"}>Boards </Link>|<Outlet></Outlet>
      <h1>Footer</h1>
    </div>
  );
}

function Error() {
  return <div>Oops you entered the incorrect route</div>;
}

function NeetOnline() {
  return <div>Welcome to online neet coaching</div>;
}
function JEEOnline() {
  return <div>Welcome to online JEE coaching</div>;
}
function BoardsOnline() {
  const navigate = useNavigate();
  return (
    <div>
      Welcome to online Boards coaching{" "}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to home page
      </button>
    </div>
  );
}

export default App;
