import React from "react";
import BookCover from "./BookCover";
import "./styles/ListBooks.css";


let path = "http://localhost:4000/"

function ExploreListComponent(props) {
    return <div className={props.scroll ? "Flex " : "Flex wrap"}>
        {props.books.map((book) => {
            if (book.picture === null || book.picture === undefined){
                book.picture = "book.png";
            }
            return (
                <BookCover
                    key = {book.bid+(Math.random()*1000).toString}
                    src={path + book.picture}
                    className={"small details"}
                    onpress={() => props.onclick(book.bid)}
                />
            );
        })}
    </div>
}

export default ExploreListComponent;