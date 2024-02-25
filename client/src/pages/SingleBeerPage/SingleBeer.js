import { useState, useEffect } from "react";    
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import beerAppService from "../../services/beerApp.service";

function SingleBeer() {
    const [beer, setBeer] = useState({});
    const {beerId}=useParams();

    useEffect(()=>{
        beerAppService
            .getSingleBeer(beerId)
            .then((res)=>{
                console.log("beer data:", res.data);
                setBeer(res.data);                
            })
            .catch((err) => {
                console.error("Error fetching beer:", err);
            })
    }, [beerId]);

    console.log("beer state after effect:", beer);

    if (!beer) {
        console.log("Beer data not loaded yet");

        return <div>Loading...</div>;
    }

    console.log("Beer data loaded:", beer);

    return(
        <Container>            
                <div>
                <h1>{beer.name}</h1>
            
            <Card>
                <div>
                    <img 
                    width={250}
                    height={250}
                    src={beer.beerImage}
                    alt={beer.name}
                    />
                </div>
                <div>
                    Brand: {beer.brand}
                </div>
                <div>
                    Description
                    <p>{beer.description}</p>
                </div>
            </Card>
            </div>    
                    
        </Container>
    )
}

export default SingleBeer;