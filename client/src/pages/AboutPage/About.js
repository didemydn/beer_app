import React from "react";
import "./About.css";

function About(){
    return (
        <div className="AboutPage">
            <div className="AboutSection"> 
                <h2>About Us</h2>
                <p>Welcome to our beer app, where you can document and rate the beers you've enjoyed!</p>
            </div>
            <div className="AboutSection">
                <h2>Our Mission</h2>
                <p>Our mission is to provide beer enthusiasts with a platform to keep track of their beer experiences and share their thoughts with others. Whether you're a seasoned beer connoisseur or just starting your beer journey, our app is designed to cater to all levels of beer appreciation.</p>
            </div>
            <div className="AboutSection">
                <h2>What We Offer</h2>
                <p>Keep a record of the beers you've tried, including details such as the name of the beer, brewery, style, and any additional notes you'd like to add. With our intuitive interface, logging your beers is quick and easy, allowing you to focus on enjoying your drink.</p>
            </div>
        </div>
    )
}

export default About;