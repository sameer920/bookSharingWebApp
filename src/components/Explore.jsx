import React from "react";
import BookCover from "./BookCover";
import Footer from "./Footer"
import ListBooks from "./ListBooks";
import "./styles/ListBooks.css";
import "./styles/Explore.css";
import SearchBar from "./SearchBar";


function Explore(props){
    return <div className="explore">
        <SearchBar />
        <h2 className="headers">Popular Books:</h2>
        <ListBooks value={true} value1={false} image="testCover.jpg"/>
        <h2 className="headers">Recommended for you:</h2>
        <ListBooks value={false} value1={true} image="testCover.jpg"/>
        <Footer onch={props.onc} />
    </div>
}

export default Explore;