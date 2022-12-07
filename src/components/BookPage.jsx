import React, { useState } from "react";
import BookCover from "./BookCover";
import ChooseSection from "./ChooseSection";
import Reviews from "./Reviews.jsx";
import "./styles/BookPage.css"
import UserAvatar from "./UserAvatar";
import Rating from '@mui/material/Rating';
import { response } from "express";

function BookPage(props) {
    let [Selected, setSelected] = useState("about");
    let [reviews, setReviews] = useState([]);
    let [book, setBook] = useState({});
    let [bookDetails, setDetails] =useState({});

    function SelectAbout() {
        setSelected("about");
        fetchBook(props.bookId);
    }

    function SelectDetails() {
        setSelected("details");
        fetchReviews(props.bookId);
        fetchDetails(props.bookId);
    }

    function fetchReviews(bookId){
        fetch("http://localhost:4000/Reviews" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        })
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch(err => console.log("error while retrieving reviews", err))

    }

    function fetchBook(bookId){
        fetch("http://localhost:4000/Book" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        }).then(response => response.json())
        .then(data => setBook(data))
        .catch(err => console.log("Error while receiving book", err));
    }

    function fetchDetails(bookId){
        fetch("http://localhost:4000/Details" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        }).then(response => response.json())
        .then(data => setDetails(data))
        .catch(err => console.log("Error while receiving Details", err));
    }


    return <div>
        <div className="whiteBackground" />
        <div className="bookPage">
            <h3>{book.name}</h3>
            <div className="bookInfo">
                <BookCover src={book.src} alt={book.alt} className="large" />
                <UserAvatar src={props.user.src} userName={props.user.name} subheading={props.user.title} className="mainUserImage" />
                <Rating value={book.rating} readOnly />
                <form action="" className="addBookButton">
                    <button type="submit"value="Request Book" className="button-primary button-full- button-medium ">Request Book</button>
                    <input type="hidden" name="email" value={props.user.email} />
                    <input type="hidden" name="email" value={book.name} />
                </form>
            </div>
            <ChooseSection selected={Selected} SelectAbout={SelectAbout} SelectDetails={SelectDetails} />
            <div className="content">
                {Selected === "about" && <p>{book.about}</p>}

                {Selected === "details" &&
                    <div>
                        <p><b>Cover: </b>{bookDetails.cover}</p>
                        <p><b>Condition: </b>{bookDetails.condition}</p>
                        <p><b>Additional Details: </b>{bookDetails.additonalDetails}</p>
                        <h3>Reviews: </h3>
                        {reviews.map(review => <Reviews key={review.key} reviewer={review.reviewer} date={review.date} content={review.content} rating={review.rating} />)}
                    </div>
                }

            </div>

        </div>
    </div>
}

export default BookPage;