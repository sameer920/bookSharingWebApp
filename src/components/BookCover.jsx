import React from "react";
import "./styles/bookCover.css";

function BookCover(props) {
    return <div>
        <img src={props.src} alt={props.alt} className={props.className + " bookCover"} onClick={props.onpress} id={props.id}/>
    </div>
}


export default BookCover;