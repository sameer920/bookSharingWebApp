import logo from './logo.svg';
import './App.css';

import Login from './Login';
import Register from './Register';
import UserAvatar from './UserAvatar';
import "./UserAvatar.css"
import BookCover from './BookCover';
function App() {
  return (
    <div className="App">
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
      <BookCover src="bricks.jpg" alt = "test cover"/>
      {/* <UserAvatar src="person.jpg" rank="owner" userName="john" alt="x" className="userProfilePic"/> */}
      {/* <Register/> */}
    </div>
  );
}

export default App;
