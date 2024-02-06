import { useState, useEffect } from "react";
import axios from "axios";
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardTitle,
    Container,
    FormFeedback,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import beerAppService from "../services/beerApp.service";

function CreateBeerPage() {
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [abv, setAbv] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
            const formData = new formData ();
            formData.append("brand", brand);
            formData.append("name", name);
            formData.append("abv", abv);
            formData.append("country", country);
            formData.append("description", description);

            beerAppService
                .createBeers(formData)
                .then(({data}) => {
                    alert ("Beer created");
                    console.log("post response data", data);
                    navigate("/beers");
                })
                .catch ((error) => {
                    console.log("error creating beer", error);
                    if (error.response) {
                        console.log("server response data", error.response.data);
                    }
                });
        
    }

    return (
        <>
        <Container>
            <FormGroup>
                <Label for="brand">Brand</Label>
                <input
                    type="text" 
                    name="brand"
                    id="beer_brand"
                    value={brand}
                    onChange={(e)=>setBrand(e.target.value)}
                />      
            </FormGroup>
            <FormGroup>
                <Label for="name">Beer Name</Label>
                <input
                    type="text" 
                    name="name"
                    id="beer_name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />      
            </FormGroup>
            <FormGroup>
                <Label for="abv">Abv</Label>
                <input
                    type="text" 
                    name="abv"
                    id="beer_abv"
                    value={abv}
                    onChange={(e)=>setAbv(e.target.value)}
                />      
            </FormGroup>
            <FormGroup>
                <Label for="country">Country</Label>
                <input
                    type="text" 
                    name="country"
                    id="beer_country"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                />      
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <input
                    type="text" 
                    name="description"
                    id="beer_description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />      
            </FormGroup>
            <FormGroup>
                <Label for="image">Add Image</Label>
                <input
                    type="file" 
                    name="image"
                    id="beer_image"
                    onChange={(e) => setImage(e.target.files[0])}
                />      
            </FormGroup>
            <Button className="button">Post</Button>

        </Container>
        </>
    )

}

export default CreateBeerPage;