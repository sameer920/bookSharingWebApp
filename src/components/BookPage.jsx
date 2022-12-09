import React, { useEffect, useState } from "react";
import BookCover from "./BookCover";
import ChooseSection from "./ChooseSection";
import Reviews from "./Reviews.jsx";
import "./styles/BookPage.css"
import UserAvatar from "./UserAvatar";
import Rating from '@mui/material/Rating';
import { useParams } from "react-router-dom";
import { redirect } from "./helperFunctions";
import Footer from "./Footer";

const path = "http://localhost:4000/"

function BookPage(props) {
    let [Selected, setSelected] = useState("about");
    let [reviews, setReviews] = useState([]);
    let [book, setBook] = useState({});
    let [bookDetails, setDetails] = useState({});
    let [rating, setRating] = useState(0);
    let [user, setUser] = useState({ src: "user.png" });
    let [requested, setRequested] = useState(false);
    let [available, setAvailable] = useState(true);
    let Params = useParams();

    useEffect(() => {
        SelectAbout(Params.bookId);
        checkAvailability();
    }, [Params.bookId])

    function SelectAbout() {
        setSelected("about");
        fetchBook(Params.bookId);
        fetchUser(Params.bookId);

        fetchReviews(Params.bookId);
        fetchDetails(Params.bookId);

    }

    function SelectDetails() {
        setSelected("details");
        fetchReviews(Params.bookId);
        fetchDetails(Params.bookId);
    }

    function fetchUser(bookId) {
        fetch(path + "Owner/" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            credentials: "include"
        })
            .then(response => {
                redirect(response, window);
                response.json().then(data => { setUser(data) })
            })
            .catch(err => console.log("Error while retreiving user", err));
    }

    function fetchReviews(bookId) {
        fetch(path + "Reviews/" + bookId, {
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

    function fetchBook(bookId) {
        fetch(path + "Book/" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        }).then(response => response.json())
            .then(data => {
                setBook(data[0]);
                setRating(data[0].rating);
            })
            .catch(err => console.log("Error while receiving book", err));
    }

    function fetchDetails(bookId) {
        fetch(path + "Details/" + bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        }).then(response => response.json())
            .then(data => setDetails(data))
            .catch(err => console.log("Error while receiving Details", err));
    }

    function requestBook() {

        fetch(path + "getUserInfo", {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            credentials: "include"
        })
            .then(response => {
                redirect(response, window);
                response.json().then(data => {
                    let userId = data.id
                    if (userId !== undefined && userId !== null) {

                        fetch(path + "RequestBook", {
                            method: "POST",
                            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
                            mode: "cors",
                            body: JSON.stringify({
                                owner: user.id,
                                targetUser: userId,
                                bookId: Params.bookId
                            }),
                            credentials: "include"
                        }).then(response => response.json().then(data => {
                            if (data.result === "Success") {
                                setRequested(true);
                                setAvailable(false);
                            }
                            else{
                                setAvailable(false);
                            }
                        })).catch(err => console.log(err));
                    }
                })

            })



    }

    function checkAvailability() {
        fetch(path + "CheckAvailability/" + Params.bookId, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors"
        }).then(response => response.json()).then(data => {
            setAvailable(data.availability);
        });
    }

    return <div>
        <div className="whiteBackground" />
        <div className="bookPage">
            <h3>{book.book_name}</h3>
            <div className="bookInfo">
                <BookCover src={book.picture === null ? path + "book.png" : path + book.picture} alt={book.alt} className="large" />
                <UserAvatar userName={user.name} subheading={user.title} className="mainUserImage" />
                <Rating value={rating} readOnly />
                
                <button
                    type="submit"
                    value="Request Book"
                    className="button-primary button-medium addBookButton"
                    onClick={requestBook}
                    disabled={!available}
                >{requested ? "Successfully Requested" : "Request Book"}
                </button>

            </div>
            <ChooseSection selected={Selected} SelectAbout={SelectAbout} SelectDetails={SelectDetails} />
            <div className="content">
                {Selected === "about" && <p>{book.synopsis}</p>}

                {Selected === "details" &&
                    <div>
                        <p><b>Cover: </b>{bookDetails.hardcover ? "Hard Cover" : "Paperback"}</p>
                        <p><b>Condition: </b>{bookDetails.condition}</p>
                        <p><b>Additional Details: </b>{bookDetails.add_details}</p>
                        <h3>Reviews: </h3>
                        {reviews.map(review => <Reviews key={review.id} reviewer={review.name} date={review.date} content={review.review} rating={review.rating} />)}
                    </div>
                }

            </div>

        </div>
        <Footer  onch={props.onc}/>
    </div>
}

export default BookPage;