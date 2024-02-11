import React, { useState } from "react";

function Search({onSearch}) {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return(
        <div>
            <h2>Search beers and rate</h2>
            <input type="text" placeholder="Search for beers" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;