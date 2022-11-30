import React from "react";
import BookCover from "./BookCover";
import "./styles/ListBooks.css"

var obje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
function ListBooks(props) {
   return (
      <>



         <div className={props.value ? "Flex " : "Flex wrap"}>
            {obje.map((val, val1) => {
               return <BookCover src={"testCover.jpg"} className={"small details"} />
            })}

            {props.value1 ? <BookCover src={"add.png"} className={"small details"} /> : ""}
         </div>
      </>

   );
}
export default ListBooks;