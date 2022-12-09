import React, { useState } from "react";
import ListBooks from "./ListBooks";
import Accept from "./Accept";
import { useEffect } from "react";
function SharingRequest(props) {
  const [req, setreq] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/getUserInfo", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const user = data;
        console.log(" sdsd",user.id,user);
        fetch(
          "http://localhost:4000/requests/" +
            data.id 
          ,{
            method: "GET",
            mode: "cors",
            headers: new Headers({
              "content-type": "application/json",
              Accept: "application/json",
            }),
            credentials: "include",
          }
        )
          .then((response) => response.json().then((datum) => {
            setreq(datum);
            console.log("datum",datum);
          }))
          ;
      });
  },[]);
  return (
    <div>
{req.map((vl2, vl3) => {
        return (
        <Accept
          img={"http://localhost:4000/" + vl2.picture}
          user={vl2.name}
          title={vl2.book_name}
          date={vl2.date_req}
          id={vl2.id}
        />
        );
        // (Src,i)
      })}
      {/* <Accept img={"add.png"} user={"amin"} title={"subtle art"} /> 
      <Accept img={"add.png"} user={"amin"} title={"subtle art"} /> */}

      <h2 className="headers">Books you are sharing</h2>
       <ListBooks
        value={false}
        value1={false}
        image={"testCover.jpg"}
        id={"booksgiven"}
      />
    </div>
  );
}
export default SharingRequest;
