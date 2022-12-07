import { Rating } from "@mui/material";
import React from "react";
import BookCover from "./BookCover";
import "./styles/searchComponent.css"

function SearchComponent(props) {
    let book = props.book;
    return <div className={"searchComponent "+props.className}>
        <div className="bookDisplay ">
            <BookCover src={book.src} alt={book.alt} className={props.className === "small" ? "extraSmall" : "small"} />
            <Rating value={book.rating} size={props.className === "small" ? "small" : "medium"} readOnly />
        </div>
        <div className="bookDetails">
            <p><b>Title:</b> {book.title}</p>
            <p><b>Author:</b>: {book.author}</p>
            <p><b>Owner:</b> {book.owner}</p>
        </div>
        <hr className={"searchDivider"+props.className}/>

    </div>
}

export default SearchComponent;