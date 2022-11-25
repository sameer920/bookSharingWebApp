import React from "react";
import "./UserAvatar.css"
function UserAvatar(props) {
    return <div>
        <img src={props.src} className={props.className} alt={props.alt} />
        <h6 className="Rank">{props.rank}</h6>
        <p>{props.userName}</p>
    </div>
}

export default UserAvatar;