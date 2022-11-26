import React from "react";
import "./styles/UserAvatar.css"
function UserAvatar(props) {
    return <div className={props.className +" userAvatar"}>
        <img src={props.src} className="userProfilePic" alt="user avatar" />
        <h3 className="name">{props.userName}</h3>
        <span className="subheading">{props.subheading}</span>
    </div>
}

export default UserAvatar;