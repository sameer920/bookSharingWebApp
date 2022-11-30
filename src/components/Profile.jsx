import React from "react";
import UserAvatar from "./UserAvatar";

function Profile(props){
    <UserAvatar className="profile" src={props.src} userName = {props.name} subheading={props.email} />
}

export default Profile;