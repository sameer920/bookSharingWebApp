import React from "react";
import BookCover from "./BookCover";
import "./styles/ListBooks.css";


function ExploreListComponent(props) {
    return <div className={props.scroll ? "Flex " : "Flex wrap"}>
        {props.books.map((book) => {
            return (
                <BookCover
                    src={book.picture}
                    className={"small details"}
                    onpress={() => props.onclick(book.bid)}
                />
            );
        })}
    </div>
}

export default ExploreListComponent;