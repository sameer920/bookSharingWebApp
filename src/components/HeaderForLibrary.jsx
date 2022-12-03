import React from "react";
import "./styles/HeaderForLibrary.css"


function HeaderForLibrary(props) {
    return (<div >
        <header id="ul">
        <div className="main" >
            <h6 className={props.select===true?"fontB main_h6 ":"fontL main_h6 "} onClick={props.onclick}>Collection</h6>
            <span className="main_span fontL">|</span>
            <h6 className={props.select===false?"fontB main_h6 ":"fontL main_h6 "} onClick={props.onclick}>Share</h6>
        </div>
        </header>
        {/* <ul id="ul">
            <li className="headersli">collection | share</li>
            
        </ul> */}
    </div>);
}

export default HeaderForLibrary;