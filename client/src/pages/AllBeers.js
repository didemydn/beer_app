import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import beerAppService from "../services/beerApp.service";
import Mylist from "./MyListPage/MyList";

function AllBeers(){
    const [beers, setBeers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        beerAppService
        .getAllBeers()
            .then((response) => {
                setBeers(response.data);
            })
            .catch((error) => {
            });
    }, []);

    return (
        <div>
            {beers.map((beer) => {
                return (
                    <div key={beer._id}>
                        <Link to={`/beer/${beer._id}`}>
                            <h3>{beer.name}</h3>
                        </Link>
                        </div>
                )
            })}
        </div>
        
    )
}

export default AllBeers;