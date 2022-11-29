import React from "react";
import ListBooks from "./ListBooks";
import "./styles/Shared.css"

function Shared(props) {
    return (
        <>
        <h2 className="headers">Books Up For Sharing</h2>
        <ListBooks value={true} value1={true}/>
        <h2 className="headers">Books Taken For Reading</h2>
        <ListBooks value={true} value1={false}/>
        <h2 className="headers">Books Reviews By You</h2>
        <ListBooks value={false} value1={true}/>
        </>
 
      );
}
export default Shared;