import React from "react";
import BookCover from "./BookCover";
import Footer from "./Footer"
import ListBooks from "./ListBooks";
import "./styles/ListBooks.css";
import "./styles/Explore.css";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import { useState } from "react";
import ExploreListComponent from "./ExploreListComponent";

let path = "http://localhost:4000";

function Explore(props){

    const [popular, setPopular] = useState([{a:""}]);
    const [recommended, setRecommended] = useState([{a:""}]);
    useEffect(()=>{
        fetch("/Explore")
        .then(response => response.json)
        .then(data => {
            setPopular(data.popularBooks);
            setRecommended(data.recommendedBooks);
        });
    });

    function openBook(id){
        window.location.href = "/Book/" + id;
    }

    return <div className="explore">

        <SearchBar />

        <h2 className="headers">Popular Books:</h2>        
        <ExploreListComponent scroll ={true} books={popular} onclick={openBook}/>
        <h2 className="headers">Recommended for you:</h2>
        <ExploreListComponent scroll ={false} books={recommended} onclick={openBook}/>
        
        <Footer onch={props.onc} />
    </div>
}

export default Explore;