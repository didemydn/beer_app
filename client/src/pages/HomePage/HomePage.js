import React from "react";
import Signup from "../SignupPage/Signup";
import "./HomePage.css";


function HomePage(){
    return (
        <div>            
            <div className="container">   
            <h2>Welcome to Beer Store</h2>             
                <img src="./beer-image.jpg"  alt="Beer" className="beer-image"/>                
                <div className="signup-form"> 
                <h3>Sign Up</h3>                   
                    <Signup/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;