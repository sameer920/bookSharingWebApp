import React from "react";
import "./styles/UserAvatar.css"
function UserAvatar(props) {
    return <div className={props.className +" userAvatar"}>
        <img src={"/user.png"} className={props.className+" userProfilePic"} alt="user avatar" />
        <h3 className={props.className + " name"}>{props.userName}</h3>
        <p className={props.className + " subheading"}>{props.subheading}</p>
        {props.showContact && <span className={props.className + " contact"}>{props.contact}</span>}
    </div>
}

export default UserAvatar;