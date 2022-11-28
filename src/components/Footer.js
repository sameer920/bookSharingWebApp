import React from "react";
import "./footer.css";
import { FaBook } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Footer_Comp from "./Footer_Comp";

function Footer(props) {
    return (<div className="footer">
        <ul className="ul">
            <Footer_Comp icon=<FaBook /> onchange={props.onch} text="Library"/>
            <Footer_Comp icon=<MdExplore /> onchange={props.onch} text="Explore"/>
            <Footer_Comp icon=<CgProfile />  onchange={props.onch}text="MyProfile"/>
        </ul>
    </div>);
}

export default Footer;