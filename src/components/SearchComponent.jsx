import { Rating } from "@mui/material";
import React from "react";
import BookCover from "./BookCover";
import "./styles/searchComponent.css"

function SearchComponent(props) {
    let book = props.book;
    return <div className={"searchComponent "+props.className} onClick={() => props.onclick(book.bid)}>
        <div className="bookDisplay ">
            <BookCover key={book.bid} src={book.picture} alt={book.alt} className={props.className === "smallSearch" ? "extraSmall" : "small"} />
            <Rating value={book.rating} size={props.className === "smallSearch" ? "small" : "medium"} readOnly />
        </div>
        <div className="bookDetails">
            <p><b>Title:</b> {book.book_name}</p>
            {/* <p><b>Author:</b>: {book.author}</p>
            <p><b>Owner:</b> {book.owner}</p> */}
        </div>
        <hr className={"searchDivider"+props.className}/>

    </div>
}

export default SearchComponent;