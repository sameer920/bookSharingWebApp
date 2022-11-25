import React from "react";
import "./UserAvatar.css"
function UserAvatar(props) {
    return <div className="userAvatar">
        <img src={props.src} className={props.className} alt={props.alt} />
        <h3 className="name">{props.userName}</h3>
        <span className="rank">{props.rank}</span>
    </div>
}

export default UserAvatar;