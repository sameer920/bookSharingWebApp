import React from "react";
import BookCover from "./BookCover";
import "./styles/ListBooks.css";
import "./styles/Explore.css";


var obje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function Explore(props){
    return <div className="explore">
        <input type="text" name="searchBook" placeholder="Search Book" className="searchBar"/>
        <div className={props.value ? "Flex " : "Flex wrap"}>
            {obje.map((val, val1) => {
               return <BookCover src={"testCover.jpg"} className={"small details"} />
            })}

            {props.value1 ? <BookCover src={"add.png"} className={"small details"} /> : ""}
         </div>
    </div>
}

export default Explore;