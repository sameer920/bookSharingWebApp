import React, { useState } from "react";
import Footer from "./Footer";
import UserAvatar from "./UserAvatar";
import ListBooks from "./ListBooks";
import "./styles/Profile.css";
import { redirect } from "./helperFunctions";

let path = "http://localhost:4000/"

function Profile(props) {
    let [user, setUser] = useState({});

    let userId
    function fetchUser() {
        fetch(path + "getUserInfo", {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            credentials: "include"
        })
            .then(response => {
                redirect(response, window);
                response.json().then(data => {
                    userId = data.id
                    if (userId !== undefined && userId !== null) {
                        fetch(path + "MyProfile/" + userId, {
                            method: "GET",
                            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
                            mode: "cors",
                            credentials: "include"
                        }).then(response => response.json()).then(data => { setUser(data) })
                    }
                })

            })
    }

    function signOut() {
        fetch(path + "Logout", {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            credentials: "include"
        })
            .then(response => redirect(response, window))
            .catch(err => console.log("ERROR WHILE LOGGING OUT ", err));
    }


    return <div onLoad={fetchUser}>
        <UserAvatar className="profile" src={user.src} userName={"Name: " + user.name} subheading={"Email: " + user.email} showContact={true} contact={"Contact: " + user.contact} />
        <h2 className="profileSubheading">Books you are sharing:</h2>
        <div className="booksUpForSharing">
            <ListBooks value={false} value1={false} image="http://localhost:4000/testCover.jpg" />
        </div>
        <button className="logOutButton button-primary button-medium" onClick={signOut}>Sign Out</button>
        <Footer onch={props.onc} />

    </div>
}

export default Profile;