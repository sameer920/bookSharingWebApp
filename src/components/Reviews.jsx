import React from "react";
import UserAvatar from "./UserAvatar";
import "./styles/reviews.css"

function Reviews(props){
    console.log(props)
    return <div className="Review">
        <UserAvatar src={props.reviewer.src} userName={props.reviewer.name} subheading={props.date} className="reviewImage"/>
        <p>{props.content}</p>
        <hr />
    </div>
}

export default Reviews;