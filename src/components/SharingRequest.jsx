import React from "react";
import ListBooks from "./ListBooks";
import Accept from "./Accept";
function SharingRequest(props) {
    return (
        <>
        <Accept img={"add.png"} user={"amin"} title={"subtle art"} />
        {/* <Accept img={"add.png"} user={"amin"} title={"subtle art"} /> */}

        <h2 className="headers">Books you are sharing</h2>
        <ListBooks value={false} value1={false} image={"testCover.jpg"} id={"booksgiven"} />
        </>

      );
}
export default SharingRequest;