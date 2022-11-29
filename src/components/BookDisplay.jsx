import React from "react";

function BookDisplay(props) {
    return <div>
        <img src={props.src} alt={props.alt} className={props.className + " bookCover"} onClick={props.onpress}/>
    </div>
}


export default BookDisplay;