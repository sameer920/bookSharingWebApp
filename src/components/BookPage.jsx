import React, { useState } from "react";
import BookCover from "./BookCover";
import ChooseSection from "./ChooseSection";
import Reviews from "./Reviews.jsx";
import "./styles/BookPage.css"
import UserAvatar from "./UserAvatar";
import Rating from '@mui/material/Rating';

function BookPage(props) {
    let [Selected, setSelected] = useState("about");

    function SelectAbout() {
        setSelected("about");
    }

    function SelectDetails() {
        setSelected("details");
    }



    return <div>
        <div className="whiteBackground" />
        <div className="bookPage">
            <h3>{props.book.name}</h3>
            <div className="bookInfo">
                <BookCover src={props.book.src} alt={props.book.alt} className="large" />
                <UserAvatar src={props.user.src} userName={props.user.name} subheading={props.user.title} className="mainUserImage" />
                <Rating value={props.book.rating} readOnly />
                <form action="" className="addBookButton">
                    <button type="submit"value="Request Book" className="button-primary button-full- button-medium ">Request Book</button>
                    <input type="hidden" name="email" value={props.user.email} />
                    <input type="hidden" name="email" value={props.book.name} />
                </form>
            </div>
            <ChooseSection selected={Selected} SelectAbout={SelectAbout} SelectDetails={SelectDetails} />
            <div className="content">
                {Selected === "about" && <p>{props.book.about}</p>}

                {Selected === "details" &&
                    <div>
                        <p><b>Cover: </b>{props.details.cover}</p>
                        <p><b>Condition: </b>{props.details.condition}</p>
                        <p><b>Additional Details: </b>{props.details.additonalDetails}</p>
                        <h3>Reviews: </h3>
                        {props.book.reviews.map(review => <Reviews key={review.key} reviewer={review.reviewer} date={review.date} content={review.content} rating={review.rating} />)}
                    </div>
                }

            </div>

        </div>
    </div>
}

export default BookPage;