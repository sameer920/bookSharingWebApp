// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
// eslint-disable-next-line
import Login from "./Login";
// eslint-disable-next-line
import Register from "./Register";
// eslint-disable-next-line
import UserAvatar from "./UserAvatar";
import "./UserAvatar.css";
// eslint-disable-next-line
import BookCover from "./BookCover";
import Library from "./components/Library";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// eslint-disable-next-line
import Explore from "./components/Explore";

function App() {
  const [page, setpage] = useState("");
  const page_func = async (ev) => {
    let newvalue = ev.target.textContent;
    setpage(newvalue);
  };
  useEffect(() => {
    console.log(page);
  }, [page]);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
          {/* <Login/> */}
          {/* <BookCover src="bricks.jpg" alt = "test cover" className="bookCover small"/> */}
          {/* <UserAvatar src="person.jpg" rank="owner" userName="john" alt="x" className="userProfilePic"/> */}
          {/* <Register/> */}

          <Route path="/Library" element={<Library onc={page_func} />}></Route>
          <Route path="/Explore" element={<Explore />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;