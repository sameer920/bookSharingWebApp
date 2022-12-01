import { Rating } from "@mui/material";
import React from "react";
import BookCover from "./BookCover";
import "./styles/searchComponent.css"

function SearchComponent(props) {
    let book = props.book;
    console.log("hello");
    return <div className="searchComponent">
        <div className="bookDisplay">
            <BookCover src={book.src} alt={book.alt} className="small" />
            <Rating value={book.rating} fontSize="small" readOnly />
        </div>
        <div className="bookDetails">
            <p><b>Title:</b> {book.title}</p>
            <p><b>Author:</b>: {book.author}</p>
            <p><b>Owner:</b> {book.owner}</p>
        </div>
        <hr className="searchDivider"/>

    </div>
}

export default SearchComponent;