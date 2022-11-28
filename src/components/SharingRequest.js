import React from "react";
import ListBooks from "./ListBooks";

function SharingRequest(props) {
    return (
        <>
        <h2 className="headers">Books you are sharing</h2>
        <ListBooks value={false} value1={false}/>
        </>

      );
}
export default SharingRequest;