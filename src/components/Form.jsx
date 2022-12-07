import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
// import "./styles/library.css"
import { useState } from "react";
import Shared from "./Shared.jsx";
import SharingRequest from "./SharingRequest.jsx";
import { Rating } from "@mui/material";
import "./styles/Form.css";
import { RiCloseCircleFill } from "react-icons/ri";

import BookCover from "./BookCover.jsx";    

function Form(props) {
  //   const [selected,setS]=useState(true);
  //   function toggle(e){
  //     if(e.target.innerText==='Collection')
  //       setS(true);
  //     else if(e.target.innerText==='Share')
  //       setS(false);
  function f(event){
    var image = document.getElementById('image');
    console.log(image.files[0]);
    // image=URL.createObjectURL(image.src);
    // image.src = URL.createObjectURL(event.target.files[0]);
	// image.src = URL.createObjectURL(event.target.files[0]);
  var disp=document.getElementById('book_upload');
  disp.src=URL.createObjectURL(image.files[0]);
    console.log(image,event,disp);
  }
  //   }
  return (
    <div className="salmon1">
      <div className="box">
        <form action="" method="post" className="Form">
          <div className="p-1">
            <div className="item1">
            <RiCloseCircleFill
            className="delbtn"
            size={20}
            onClick={props.close}
          />
              <BookCover src="add.png" className="image small" id="book_upload"/>
              <button type="button" className="addbtn">
                <label for="image"  style={{alignSelf:"center",width:"100%" ,display:"block"}}>
                  Image
                  <input

                    type="file" 
                    accept="image/"
                    name=""
                    onChange={f}

                    id="image"
                    style={{ display: "none" }}
                  />
                  {/* <input type="file" name="fee" id="" /> */}
                </label>
              </button> 
            </div>
            <div className="item2">
              <input type="text" placeholder="title" />
              <input type="text" placeholder="author" />
              {!props.condition ?(<div><h3>Rating:</h3> <Rating   /> </div> ): <></>}
            </div>
          </div>
          <div className="p-2">
            
            {props.condition ? (<div style={{alignSelf:"center",width:"50%"}}><h2 style={{display:"inline"}}>Hardcover </h2><input type="checkbox" name="hardcover" /></div>
            ) : (
              <></>
            )

            }
            {props.condition ? <div style={{alignSelf:"center",width:"50%"}}><h2 >Condition:</h2> <Rating /> </div> 
:<></>}
            <textarea name="" id="" cols="30" rows="4" placeholder="Synopsis"></textarea>
            {props.condition ? (
              <textarea name="" id="" cols="30" rows="4" placeholder="additional details"></textarea>
            ) : (
              <textarea name="" id="" cols="30" rows="4" placeholder="Review"></textarea>
            )}
            <input type="button" value="Submit"  className="btn_sub "/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
