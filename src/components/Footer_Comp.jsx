import React from "react";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom"
function Footer_Comp(props) {
  let link = "/" + props.text;
  const loc= useLocation().pathname;
  console.log(loc);
  return (
    <Link to={link} style={{textDecoration:"none"}}>
      <li  onClick={props.onchange} className={loc===link?"li toggle":" li"} >
        {props.icon}
        <br></br>
        {props.text}
      </li>
    </Link>
  );
}
export default Footer_Comp;
