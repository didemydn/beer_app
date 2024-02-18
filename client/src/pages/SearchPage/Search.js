import React, { useState } from "react";
import { useEffect } from "react";
import beerAppService from "../../services/beerApp.service";

function Search() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [selectedBeers, setSelectedBeers] = useState(null);

    useEffect(()=>{    
        if (search.trim() !== "") {    
            beerAppService.searchBeers(search)
            .then(res => {
                setData(res.data);
            })
            .catch((error) => {
                console.log("Error searching beers:", error)
            });
        } else if (search.trim() === "") {
            // Keep previous search results until a new search is initiated
            // This ensures smoother user experience
            return;
        }
     }, [search]);

    const filter = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const handleAddToList = (beer) => {
        setSelectedBeers(beer);              
    } 
    
    return(
        <div>
            <h2>Search beers and rate</h2>
            <input type="text" placeholder="Search for beers" value={search} onChange={filter}/>
            <ul>
                {data.map((beer, index) => (
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