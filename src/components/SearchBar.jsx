import React, { useState } from "react";
import SearchComponent from "./SearchComponent";

function SearchBar(props) {
    const [items, setItems] = useState([]);
    const [inputData, setInputData] = useState("");
    const [submitted, setSubmitted] = useState("")

    function handleFormState(event) {
        setInputData(event.target.value);
        if (inputData.length >= 3) {
            sendToBackend(null);
        }
    }

    function sendToBackend(event) {
        if (event !== null) {
            event.preventDefault();
        }
        return fetch("http://localhost:4000/" + "Search", {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            body: JSON.stringify({"searchStr":inputData}),            
            // credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(err => console.log(err))

    }

    function onclick(id){
        window.location.href = "http://localhost:4000/Book" + id; 
    }

    return <div className="searchBar">
        <form onSubmit={sendToBackend}>
            <input type="text" name="searchBook" placeholder="Search Book" className="searchBar" onChange={handleFormState} value={inputData} />
        </form>
        {items.length > 0 && <div className="results">
            {items.map(item => <SearchComponent key={item.bid} book={item} onclick={onclick} className="smallSearch"/>)}
        </div>}
    </div>
}

export default SearchBar;