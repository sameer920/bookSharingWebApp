import React from "react";
import "./bookCover.css";

function BookCover(props) {
    return <div>
        <img src={props.src} alt={props.alt} className={props.className} />
    </div>
}

export default BookCover;