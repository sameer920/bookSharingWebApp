import React from "react";
import "./styles/ChooseSection.css"

function ChooseSection(props){
    let Selected = props.selected.toLowerCase();
    return <div className="ChooseSection">
        <h3 className={Selected==="about" ? "Selected": ""}>About Book</h3>
        <h3 className={Selected==="details" ? "Selected":""}>Details</h3>
        <hr />
        {Selected === "about" && <hr className="left SelectedUnderline"/>}
        {Selected === "details" && <hr className="right SelectedUnderline"/>}
        
    </div>
}

export default ChooseSection;