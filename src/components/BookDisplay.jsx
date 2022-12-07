import React from "react";
import "./styles/BookDisplay.css";
import BookCover from "./BookCover";
import { RiCloseCircleFill } from "react-icons/ri";
import Rating from "@mui/material/Rating";

function BookDisplay(props) {
  console.log("yes", props.obj.image);

  return (
    <div className="salmon1">
      <div className="box">
        {/* {props.text} */}
        {/* <div className="del" > */}
        <div className="screen_img">
          <BookCover src={props.obj.image} className="large " />
          <RiCloseCircleFill
            className="delbtn"
            size={30}
            onClick={props.close}
          />
          {/* </div> */}
          <Rating
            value={props.obj.rating}
            size="small"
            readOnly
            style={{ justifyContent: "center" }}
          />
        </div>
        <div className="screen_div">
          <h2>Title : {props.obj.name}</h2>
          <h2>Author : {props.obj.author}</h2>
          {/* //owner dikhna ha ya nhi */}
          {props.owner ? (
            <h2>
              {props.obj.usertype}:{props.obj.usertypename}
            </h2>
          ) : (
            <></>
          )}
          <h2>Details :{props.obj.details}</h2>
          {props.cond ? <h2>Condition :{props.obj.condition} </h2> : <></>}
          {props.cond ? <h2>Hardcover :{props.obj.hardcover}</h2> : <></>}
          <h2>
            {props.obj.datetype} :{props.obj.date}
          </h2>
          {props.review ? (
            <h2 style={{ marginRight: "2vh", overflowY: "auto" }} className="h2_description">
              Description : Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Molestias eum fugit necessitatibus saepe, eveniet quidem
              exercitationem rem totam perspiciatis? Recusandae molestias
              nesciunt fugit reiciendis accusantium qui eligendi velit vitae
              numquam?{props.obj.text}
            </h2>
          ) : (
            <></>
          )}
          <div className="buttons">
            {props.btn ? (
              <button className="btn" style={props.review ? {} : {}}>
                {props.obj.btn_name}
              </button>
            ) : (
              <></>
            )}
          </div>
          {props.review ? <div style={{ marginTop: "30px" }}> </div> : <></>}
        </div>
      </div>
    </div>
  );
}

export default BookDisplay;
