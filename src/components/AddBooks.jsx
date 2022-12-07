import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
// import "./styles/library.css"
import { useState } from "react";
import Shared from "./Shared.jsx";
import SharingRequest from "./SharingRequest.jsx";
import SearchBar from "./SearchBar";
import SearchComponent from "./SearchComponent.jsx";
import Form from "./Form";
import "./styles/AddBooks.css"

function AddBooks(props) {
  //   const [selected,setS]=useState(true);
  //   function toggle(e){
  //     if(e.target.innerText==='Collection')
  //       setS(true);
  //     else if(e.target.innerText==='Share')
  //       setS(false);
  //   }
  const [form,setform]=useState(false);
  const [book,setbook]=useState(false);
  function close(){
    setform(false);
  }
  function f(){
    
    if(props.text==="book"){
        setbook(true);
        setform(true);
    }
    else{
        setbook(false);
        setform(true);
    }


  }
  return (
    <div>
      {/* <SearchBar /> */}
      {/* <SearchComponent /> */}
      <div className="headbook"><h2 >Welcome !</h2>
      {props.text==="book"?<h2 className="jumbtron">Add Books for Sharing</h2>:<h2 className="jumbtron">Add Reviews of your Books</h2>}
      </div>
      <input type="text" className="input"/>
      <br></br>
      <button onClick={f} className="btn"><h3>Custom {props.text}</h3></button>
      {form?<Form condition={book} close={close}/>:<></>}
      <Footer />
    </div>
  );
}

export default AddBooks;
