import React from "react";
import "./styles/bookCover.css";

function BookCover(props) {
    return <div>
        <img src={props.src} alt={props.alt} className={props.className + " bookCover"} />
    </div>
}

export default BookCover;