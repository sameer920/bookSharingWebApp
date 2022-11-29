import React, { useState } from "react";
import BookCover from "./BookCover";
import BookDisplay from "./BookDisplay";
import "./ListBooks.css"
import "./styles/ListBooks.css"

var obje=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
function click(e){
    // console.log(e.target.src);
    // return <BookDisplay />

}
function ListBooks(props) {
    const [display,set]=useState(false);
    const [image,setimage] =useState("");
    // const []

    return (
        <>


     <div  className={props.value?"Flex ":"Flex wrap"}>
     {obje.map((val,val1)=>{
       return <BookCover src={props.image} className={"small details"}  onpress={click} />
    })}

        {props.value1?<BookCover src={"add.png"} className={"small details"} onpress={click}/>: ""}
     </div>
        </>

      );
}
export default ListBooks;