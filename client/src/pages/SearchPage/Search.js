import React, { useState } from "react";
import { useEffect } from "react";
import beerAppService from "../../services/beerApp.service";

function Search(e) {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBeers, setSelectedBeers] = useState(null);

    useEffect(()=>{
        if (input.trim() !== '') {
        beerAppService.getAllBeers(input)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.log("Error searching beers:", error)
            });
        } else {
            setSearchResults([]);
        }
    }, [input]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddToList = (beer) => {
        setSelectedBeers(beer);     
         
        } 
    

    return(
        <div>
            <h2>Search beers and rate</h2>
            <input type="text" placeholder="Search for beers" value={input} onChange={handleInputChange}/>
            <ul>
                {searchResults.map((beer, index) => (
                    <li key={index}>
                        {beer.name} 
                        <button onClick={() => handleAddToList(beer)}>Add to List</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;