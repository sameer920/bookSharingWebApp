import React, { useState } from "react";
import Footer from "./Footer";
import UserAvatar from "./UserAvatar";
import ListBooks from "./ListBooks";
import "./styles/Profile.css";

let path = "http://localhost:4000/"

function Profile(props) {
    let [user, setUser] = useState({});

    function fetchUser(userId){
        // fetch(path+"MyProfile/"+ userId).then(response => response.json()).then(data=>setUser(data));
    }


    return <div onLoad={fetchUser}>
        <UserAvatar className="profile" src={ user.src} userName={"Name: " +user.name} subheading={"Email: "  +user.email} showContact={true} contact = {"Contact: " +user.contact}/>
        <div className="booksUpForSharing">
        <ListBooks value={false} value1={true} image="http://localhost:4000/testCover.jpg"/>
        </div>
        <div className="button"></div>
        <Footer onch={props.onc} />

    </div>
}

export default Profile;