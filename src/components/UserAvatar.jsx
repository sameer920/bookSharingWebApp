import React from "react";
import "./styles/UserAvatar.css"
function UserAvatar(props) {
    return <div className={props.className +" userAvatar"}>
        <img src={props.src} className={props.className+" userProfilePic"} alt="user avatar" />
        <h3 className={props.className + " name"}>{props.userName}</h3>
        <span className={props.className + " subheading"}>{props.subheading}</span>
    </div>
}

export default UserAvatar;