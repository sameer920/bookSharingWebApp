import React from "react";
import Footer from "./Footer.js";
import Header from "./HeaderForLibrary.js";

import { useState } from "react";
import Shared from "./Shared.js";
import SharingRequest from "./SharingRequest.js";
function Library(props) {
  const [selected,setS]=useState(true);
  function toggle(e){
    if(e.target.innerText==='Collection')
      setS(true);
    else if(e.target.innerText==='Share')
      setS(false);
  }
  return (
    <div>
      <Header onclick={toggle} select={selected} />
      <div style={{ marginTop: "15vmin" }}></div>
{selected?<Shared />:<SharingRequest />}
      <div style={{ marginBottom: "15vmin" }}></div>
      <Footer onch={props.onc} />
    </div>
  );
}

export default Library;
