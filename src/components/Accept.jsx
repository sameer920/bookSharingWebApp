import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
import "./styles/Accept.css";
import { useState } from "react";
import BookCover from "./BookCover.jsx";
import { Button } from "@mui/material";

function Accept(props) {
  function update_state(event) {
    event.preventDefault();
    console.log(event.target.id);
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
        console.log("DATA:",data)
        const user = {
          owner: data.id,
          title:props.title,
          state:event.target.id,
          id:props.id
        };
        fetch("http://localhost:4000/update_req", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
        }),
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(user),
        credentials: "include",
      })
        .then((response) => console.log(user))
      });
  }
  return (
    <div className="main-div">
      <BookCover src={props.img} className="small img_accept" />
      <div className="div-1">
        <h3>Title: {props.title}</h3>
        <h3>Requested by: {props.user}</h3>
        <h3>Date: {props.date}</h3>
        <div className="buttons">
          <button onClick={update_state} id="true">
            ACCEPT
          </button>
          <button onClick={update_state} id="false">
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accept;
