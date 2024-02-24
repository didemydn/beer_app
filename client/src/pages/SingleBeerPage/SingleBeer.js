import { useState, useEffect } from "react";    
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import beerAppService from "../../services/beerApp.service";

function SingleBeer() {
    const [beer, setBeer] = useState([]);
    const {beerId}=useParams();

    useEffect(()=>{
        beerAppService
            .getSingleBeer(beerId)
            .then((res)=>{
                console.log("beer data:", res.data);
                setBeer(res.data);                
            })
            .catch((err) => {

            })
    }, [beerId]);

    if (!beer) {
        return <div>Loading...</div>;
    }

    return(
        <Container>
            {beer.map((singleBeer, index) =>(
                <div key={index}>
                <h1>{singleBeer.name}</h1>
            
            <Card>
                <div>
                    <img 
                    width={250}
                    height={250}
                    src={singleBeer.beerImage}
                    alt={singleBeer.name}
                    />
                </div>
                <div>
                    Brand: {singleBeer.brand}
                </div>
                <div>
                    Description
                    <p>{singleBeer.description}</p>
                </div>
            </Card>
            </div>    
            ))}        
        </Container>
    )
}

export default SingleBeer;