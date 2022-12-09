import React from "react";
import UserAvatar from "./UserAvatar";
import "./styles/reviews.css"
import Rating from '@mui/material/Rating';

function Reviews(props){
    console.log(props)
    return <div className="Review">
        <UserAvatar userName={props.name} subheading={props.date} className="reviewImage"/>
        <Rating value={props.rating} size="small" readOnly />
        <p>{props.content}</p>
        <hr />
    </div>
}

export default Reviews;