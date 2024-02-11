import React from "react";
import { Link } from "react-router-dom";

function Mylist({beers=[]}){
    return(
        <div>
            <h2>My Beers</h2>
            {beers.length === 0 ? (
                <p>No rated beers found. Please click the plus sign button to add and rate beers</p>
            ) : (
                <ul>
                    {beers.map((beer, index) => (
                        <li key={index}>{beer.name}</li>
                    ))}
                </ul>
            )}
            <Link to="/search" className="add-beer-button">+</Link>
        </div>
    );
}

export default Mylist;