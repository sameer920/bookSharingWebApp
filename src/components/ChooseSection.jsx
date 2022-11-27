import React, { useState } from "react";
import "./styles/ChooseSection.css"



function ChooseSection(props) {
    let [Chosen, ChangeChosen] = useState("about");

    function ChooseAbout() {
        props.SelectAbout();
        ChangeChosen("about");
    }
    function ChooseDetails() {
        props.SelectDetails();
        ChangeChosen("details");
    }

    return <div className="ChooseSection">
        <hr />
        <div onClick={ChooseAbout}>
            <h3 className={Chosen === "about" ? "Selected" : ""}  >About Book</h3>
            {Chosen === "about" && <hr className="left SelectedUnderline" />}
        </div>
        <div onClick={ChooseDetails}>
            <h3 className={Chosen === "details" ? "Selected" : ""}  >Details</h3>
            {Chosen === "details" && <hr className="right SelectedUnderline" />}
        </div>
    </div>
}

export default ChooseSection;