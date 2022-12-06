import React, { useState } from "react";
import SearchComponent from "./SearchComponent";

function SearchBar(props) {
    const [items, setItems] = useState([]);
    const [inputData, setInputData] = useState("");

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
        return fetch("http://localhost:4000/" + search, {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json', 'Accept': 'application/json' }),
            mode: "cors",
            body: JSON.stringify(inputData)
        })
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(err => console.log(err))

    }

    return <div className="searchBar">
        <form onSubmit={sendToBackend}>
            <input type="text" name="searchBook" placeholder="Search Book" className="searchBar" onChange={handleFormState} value={inputData} />
        </form>
        {items.length >= 3 && <div className="results">
            {items.map(item => <SearchComponent book={item} className="small"/>)}
        </div>}
    </div>
}

export default SearchBar;