import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Search from "../../components/Search"

function Mylist(){
    const [beers, setBeers] = useState([]);
    // const { authenticateUser} = useContext(AuthContext);
    // if (!authenticateUser) {
    //     return <Navigate to="/user/login" />;
    // }
    
    return(
        <div>
            <h2>My Beers</h2>
            {/* Render the Search component */}
            <Search setBeers={setBeers} />
            {/*Display the list*/}
            {beers.length === 0 ?
                <p>No rated beers found. Please search the beer and rate beers</p>
                : (
                    <ul>
                        {beers.map((beer, index)=> (
                            <li key={index}>{beer.name}</li>                            
                        ))}
                    </ul>
                )}    
        </div>
    );
}

export default Mylist;