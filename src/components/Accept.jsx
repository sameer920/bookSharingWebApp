import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
import "./styles/Accept.css";
import { useState } from "react";
import BookCover from "./BookCover.jsx";
import { Button } from "@mui/material";

function Accept(props) {
  return (
    <div className="main-div">
      <BookCover src={props.img} className="small img_accept" />
      <div className="div-1">
        <h3>Title: {props.title}</h3>
        <h3>Requested by: {props.user}</h3>
        <h3>Date: {props.date}</h3>
        <div className="buttons">
          <button>ACCEPT</button>
          <button>REJECT</button>
        </div>
      </div>
    </div>
  );
}

export default Accept;
