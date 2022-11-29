import React from "react";
import "./styles/footer.css";
import Footer_Comp from "./Footer_Comp";
import BookIcon from '@mui/icons-material/Book';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Footer(props) {
    return (<div className="footer">
        <ul className="ul">
            {/* <Footer_Comp icon=<FaBook /> onchange={props.onch} text="Library"/> */}
            <Footer_Comp icon=<BookIcon fontSize="medium"/>onchange={props.onch} text="Library"/>
            <Footer_Comp icon=<ExploreIcon fontSize="medium"/> onchange={props.onch} text="Explore"/>
            <Footer_Comp icon=<AccountCircleIcon fontSize ="medium"/>  onchange={props.onch}text="MyProfile"/>
        </ul>
    </div>);
}

export default Footer;