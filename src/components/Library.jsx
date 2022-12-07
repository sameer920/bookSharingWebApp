import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
import "./styles/library.css"
import { useState } from "react";
import Shared from "./Shared.jsx";
import SharingRequest from "./SharingRequest.jsx";
function Library(props) {

  fetch("http://localhost:4000/getUserInfo", {
    method: "GET",
    headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
    mode: "cors",
    credentials: "include"
  }).then(response => response.json()).then(data => console.log(data))
  
  const [selected, setS] = useState(true);
  function toggle(e) {
    if (e.target.innerText === 'Collection')
      setS(true);
    else if (e.target.innerText === 'Share')
      setS(false);
  }
  return (
    <div >
      <Header onclick={toggle} select={selected} />
      <div style={{ marginTop: "15vmin" }}></div>
      <div id="bookbody">
        {selected ? <Shared /> : <SharingRequest />}
      </div>

      <div style={{ marginBottom: "15vmin" }}></div>
      <Footer onch={props.onc} />
    </div>
  );
}

export default Library;
