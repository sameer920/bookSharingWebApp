import React from "react";
import BookCover from "./BookCover";
import ChooseSection from "./ChooseSection";
import Reviews from "./Reviews.jsx";
import "./styles/BookPage.css"
import UserAvatar from "./UserAvatar";


function BookPage(props) {
    let Selected = props.selected.toLowerCase();
    return <div className="bookPage">
        <h3>{props.book.name}</h3>
        <div className="bookInfo">
            <BookCover src={props.book.src} alt={props.book.alt} className="large"/>
            <UserAvatar src={props.user.src} userName={props.user.name} subheading = {props.user.title} className="mainUserImage"/>
        </div>
        <ChooseSection selected={Selected} />
        <div className="content">
            {Selected === "about" && <p>{props.book.about}</p>}

            {Selected === "details" &&
                <div>
                    <p><b>Cover: </b>{props.details.cover}</p>
                    <p><b>Condition: </b>{props.details.condition}</p>
                    <p><b>Additional Details: </b>{props.details.additonalDetails}</p>
                    <h3>Reviews: </h3>
                    {props.book.reviews.map(review => <Reviews key={review.key} reviewer={review.reviewer} date={review.date} content={review.content} />)}
                </div>
            }

        </div>

    </div>
}

export default BookPage;