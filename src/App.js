// eslint-disable-next-line
import logo from "./components/styles/App.css";
import "./components/styles/App.css";
// eslint-disable-next-line
// import Login from "./Login";
// eslint-disable-next-line
// import Register from "./Register";
// eslint-disable-next-line
import UserAvatar from "./components/UserAvatar";
// eslint-disable-next-line
import Library from "./components/Library";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// eslint-disable-next-line
import Explore from "./components/Explore";
// import SearchComponent from "./components/SearchComponent";
import Profile from "./components/Profile";
import Register from "./components/Register";
import AddBooks from "./components/AddBooks";
import React, { Component }  from 'react';
let book = {
  src: "testCover.jpg",
  name: "test book",
  alt: "test",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  rating: 4
}

let user = {
  src: "person.jpg",
  name:"Sameer",
  email: "sameer@example.com"
}


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
          {/* <Register/> */}

          <Route path="/Library" element={<Library onc={page_func} />}></Route>
          <Route path="/Explore" element={<Explore onc={page_func} value={false} value1={false}/>}></Route>
          <Route path="/MyProfile" element={<Profile onc={page_func} user={user}/>} ></Route>
          <Route path="/Register" element={<Register onc={page_func}/>} />
          {/* <Route path="/test" element={
            // <SearchComponent book={book} className="small" />
            // <Profile />

            } /> */}
            <Route path="/AddBooks" element={<AddBooks text={"book"}/>} />
            <Route path="/AddReviews" element={<AddBooks text={"review"}/>} />

            {/* }  */}
            {/* /> */}

        </Routes>
      </Router>

    </div>
  );
}

export default App;
