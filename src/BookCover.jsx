import React from "react";
import "./bookCover.css";

function BookCover(props) {
    return <div>
        <img src={props.src} alt={props.alt} className="bookCover" />
    </div>
}

export default BookCover;