import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
// import "./styles/library.css"
import { useState } from "react";
import { Rating } from "@mui/material";
import "./styles/Form.css";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "axios";
import BookCover from "./BookCover.jsx";
import { useEffect } from "react";

function f(event) {
  var image = document.getElementById("image");
  console.log(image.files[0]);
  // image=URL.createObjectURL(image.src);
  // image.src = URL.createObjectURL(event.target.files[0]);
  // image.src = URL.createObjectURL(event.target.files[0]);
  var disp = document.getElementById("book_upload");
  disp.src = URL.createObjectURL(image.files[0]);
  console.log(image, event, disp);
}
function Form(props) {
  const [review, setreview] = useState({});
  const [book, setbook] = useState({});
  const [img,setimg]=useState(null);
  useEffect(
    function () {
      fetch("http://localhost:4000/AddBooks", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
        }),
        mode: "cors",
        body: JSON.stringify(book),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if(!data){
            const datum = new FormData();
            datum.append("file", img);
            axios.post("http://localhost:4000/upload", datum).then((res) => {
        // this.setState({ photos: [res.data, ...this.state.photos] });
        console.log(res);
      });
          }
          console.log(data);
        });
    },
    [book]
  );
  function sub_form(e) {
    e.preventDefault();
    const hard = e.target.hardcover.checked?true:false;
    
    setimg(e.target.image.files[0]);

    // await axios.post("http://localhost:4000/upload", data).then((res) => {
    //   // this.setState({ photos: [res.data, ...this.state.photos] });
    //   console.log(res);
    // });
    let user = {
      id: 2,
    };
    fetch("http://localhost:4000/getUserInfo", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        user = data;
        console.log(user.id);
        setbook({
          id: user.id,
          title: e.target.title.value,
          author: e.target.author.value,
          condition: e.target.condition.value,
          hardcover: hard,
          synopsis: e.target.synopsis.value,
          details: e.target.details.value,
          // file:e.target.image.files[0]
        });
      });
  }
  return (
    <div className="salmon1">
      <div className="box">
        <form action="" method="post" className="Form" onSubmit={sub_form}>
          <div className="p-1">
            <div className="item1">
              <RiCloseCircleFill
                className="delbtn"
                size={20}
                onClick={props.close}
              />
              <BookCover
                src="add.png"
                className="image small"
                id="book_upload"
                name="image"
              />
              <button type="button" className="addbtn">
                <label
                  for="image"
                  style={{
                    alignSelf: "center",
                    width: "100%",
                    display: "block",
                  }}
                >
                  Image
                  <input
                    type="file"
                    accept="image/"
                    name="file"
                    onChange={f}
                    id="image"
                    style={{ display: "none" }}
                  />
                  {/* <input type="file" name="fee" id="" /> */}
                </label>
              </button>
            </div>
            <div className="item2">
              <input type="text" placeholder="title" name="title" />
              <input type="text" placeholder="author" name="author" />
              {!props.condition ? (
                <div>
                  <h3>Rating:</h3> <Rating name="rating" />{" "}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="p-2">
            {props.condition ? (
              <div style={{ alignSelf: "center", width: "50%" }}>
                <h2 style={{ display: "inline" }}>Hardcover </h2>
                <input type="checkbox" name="hardcover" />
              </div>
            ) : (
              <></>
            )}
            {props.condition ? (
              <div style={{ alignSelf: "center", width: "50%" }}>
                <h2>Condition:</h2> <Rating name="condition" />{" "}
              </div>
            ) : (
              <></>
            )}
            <textarea
              name="synopsis"
              id=""
              cols="30"
              rows="4"
              placeholder="Synopsis"
            ></textarea>
            {props.condition ? (
              <textarea
                name="details"
                id=""
                cols="30"
                rows="4"
                placeholder="additional details"
              ></textarea>
            ) : (
              <textarea
                name="review"
                id=""
                cols="30"
                rows="4"
                placeholder="Review"
              ></textarea>
            )}
            <input type="submit" value="Submit" className="btn_sub " />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
