import React, { useState } from "react";
import { useEffect } from "react";
import beerAppService from "../services/beerApp.service";

function Search({ setBeers }) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(()=>{    
        if (search.trim() !== "") {    
            beerAppService.getAllBeers(search)
            .then(res => {
                console.log("API Response:", res);
                const filteredBeers = res.data.filter(beer => beer.name.includes(search));
                setData(filteredBeers);
            })
            .catch((error) => {
                console.log("Error searching beers:", error)
            });
        } else if (search.trim() === "") {
            // Keep previous search results until a new search is initiated
            // This ensures smoother user experience
            setData([]);
        }
     }, [search]);

    const filter = (e) => {
        setSearch(e.target.value);
    }

    const handleAddToList = (beer) => {
        setBeers(prevBeers => [...prevBeers, beer]);
        setSearch("");              
    } 
    
    return(
        <div>
            <h3>Search beers and rate</h3>
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