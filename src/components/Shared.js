import React from "react";
import ListBooks from "./ListBooks";
import "./Shared.css"

function Shared(props) {
    return (
        <>
        <h2 className="headers">Books Up For Sharing</h2>
        <ListBooks value={true} value1={true} image={"testCover.jpg"}/>
        <h2 className="headers">Books Taken For Reading</h2>
        <ListBooks value={true} value1={false} image={"book1.jpg"}/>
        <h2 className="headers">Books Reviews By You</h2>
        <ListBooks value={false} value1={true} image={"testCover.jpg"}/>
        </>
      );
}
export default Shared;