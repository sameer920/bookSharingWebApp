import React from "react";
import Footer from "./Footer";
import UserAvatar from "./UserAvatar";
import ListBooks from "./ListBooks";
import "./styles/Profile.css";

function Profile(props) {
    let user = props.user;
    return <div>
        <UserAvatar className="profile" src={ user.src} userName={"Name: " +user.name} subheading={"Email: "  +user.email} showContact={true} contact = {"Contact: " +props.contact}/>
        <div className="booksUpForSharing">
        <ListBooks value={false} value1={true} image="testCover.jpg"/>
        </div>
        <div className="button"></div>
        <Footer onch={props.onc} />

    </div>
}

export default Profile;