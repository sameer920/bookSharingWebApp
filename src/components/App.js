// import logo from './logo.svg';
import './styles/App.css';

import Login from './Login';
import Register from './Register';
import UserAvatar from './UserAvatar';
import BookCover from './BookCover';
import ChooseDetails from './ChooseSection';
import BookPage from './BookPage';

let user = {
  src: "person.jpg",
  name:"Sameer",
  title: "Owner"
}


let reviewArr = [{
  key: 1,
  reviewer: user,
  date: "11/27/2022",
  rating: 4,
  content: "Maecenas posuere porttitor venenatis."
},
{
  key: 2,
  reviewer: user,
  date: "11/27/2022",
  rating: 3,
  content: "Maecenas posuere porttitor venenatis."
}
]

let book = {
  src: "testCover.jpg",
  name: "test book",
  alt: "test",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  reviews: reviewArr,
  rating: 4
}

let details = {
  cover:"Hard Cover",
  condition: 4,
  addtionalDetails: "Test"
}


let about = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas posuere porttitor venenatis. Vestibulum id est nunc. Pellentesque porta pharetra odio id pretium. Mauris mattis, neque sed aliquam blandit, purus lorem ultricies justo, sit amet pretium mauris ipsum sed tellus. Donec nec ultricies nisl, at interdum velit. Proin ultrices dictum diam ac placerat. Morbi sit amet vulputate massa, et sodales dui. Vivamus pellentesque ante dignissim enim ornare euismod. Mauris in purus imperdiet, suscipit ante ac, malesuada purus. Vivamus est nibh, condimentum ut finibus ut, faucibus nec justo. Pellentesque vulputate sollicitudin elit eget tristique. Mauris vitae aliquam ligula, sit amet lacinia sapien. Cras id augue elementum, viverra lacus vitae, sodales lorem. Praesent fringilla id orci eget cursus. Morbi eget magna vitae erat sagittis egestas at non neque. Etiam ut tempor lectus, quis pretium mi. Sed vel ex ac felis sagittis elementum. Aenean ultricies pretium tincidunt. Quisque a neque posuere, consequat neque ut, hendrerit eros. In hac habitasse platea dictumst. Praesent nisl arcu, placerat vitae viverra eget, finibus vel orci. Ut pulvinar purus at gravida facilisis. Cras urna sem, sagittis sed viverra non, faucibus at purus. Sed eu dui a lacus euismod dapibus a in orci. Curabitur purus nulla, dignissim eu blandit sed, tempus ac diam. Sed vel ligula nec lorem ultricies semper ut vel eros. Suspendisse sed ligula lobortis, ullamcorper nisi eu, sollicitudin eros. Pellentesque sit amet aliquam enim. Proin eleifend mauris et mauris convallis laoreet. Nam ex leo, ultricies a sagittis eget, pulvinar in arcu. Cras in felis luctus, porta orci sed, vestibulum elit. Ut venenatis ac libero egestas volutpat. Curabitur malesuada est non felis dictum, sit amet molestie leo scelerisque. Nunc faucibus ligula quis tellus imperdiet, quis tincidunt arcu iaculis. Fusce sit amet purus eget nisi porta condimentum ut non urna. Morbi aliquet, tellus quis sollicitudin rhoncus, augue urna vestibulum nisi, id lobortis dui dui eu ex. Maecenas interdum eu lorem eu posuere. Nulla vitae volutpat sem, eu pharetra enim. Mauris aliquam tempor ipsum a iaculis. Fusce ut iaculis tortor. Integer at quam eget quam tempus faucibus sit amet vitae purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla sed scelerisque elit. Suspendisse tempor est non eros lobortis, et accumsan ex pretium. Aliquam nec maximus mauris. Maecenas vitae ipsum ornare, varius lorem at, consequat odio. Donec consectetur vel nisl consectetur iaculis. Aliquam venenatis nulla in volutpat hendrerit. Pellentesque nec massa id mi gravida efficitur vel quis arcu. Donec vulputate non dui quis lobortis. Ut tincidunt gravida sem at facilisis. Quisque semper venenatis metus, non vehicula lorem accumsan non. Ut est justo, tempus non turpis convallis, aliquam accumsan quam. Ut elementum dictum tempus. Integer non ullamcorper turpis. Praesent et ex nec arcu rhoncus congue. Sed rhoncus, erat nec feugiat luctus, ipsum turpis mattis mi, et maximus neque leo nec quam. In maximus laoreet eros eget commodo."
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
      {/* <BookCover src="bricks.jpg" alt = "test cover" className="bookCover small"/> */}
      {/* <UserAvatar src="person.jpg" rank="owner" userName="john" alt="x" className="userProfilePic"/> */}
      {/* <Register/> */}
      <BookPage book={book} user={user} selected={"details"} details = {details}/>
    </div>
  );
}

export default App;
