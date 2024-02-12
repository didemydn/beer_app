import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Mylist({beers=[]}){
    const { authenticateUser} = useContext(AuthContext);
    //if (!authenticateUser) {
    //    return <Navigate to="/user/login" />;
    //}
    return(
        <div>
            <h2>My Beers</h2>
            {beers.length === 0 ? 
                <p>No rated beers found. Please click the plus sign button to add and rate beers</p>
             : (
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