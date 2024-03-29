const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const router = express.Router();
const saltRounds = 10;

console.log("Inside auth.routes.js");

//POST /auth/signup
router.post('/signup', (req,res, next) => {
    const { email, password, name, userType } =req.body;

// Check if the email or password or name is provided as an empty string 
if (email=== "" || password ==="" || name === "") {
    res.status(400).json({message: "please provide email, password or name"});
    return;
}

// Use regex to validate the email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!emailRegex.test(email)) {
    res.status(400).json({message: "Please provide a valid email address."});
    return;
}

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!passwordRegex.test(password)) {
    res.status(400).json({message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."});
    return;
}

 // Check the users collection if a user with the same email already exists

 User.findOne({email})
    .then((foundUser) => {
        // If the user with the same email already exists, send an error response
        if (foundUser) {
            res.status(400).json({message: "User already exists."});
            return;
        }

        // If the email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user in the database
        // We return a pending promise, which allows us to chain another `then` 
        return User.create({email, password: hashedPassword, name, userType});
    })
    .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const {email, name, _id, userType} = createdUser;

        // Create a new object that doesn't expose the password
        const user = {email, name, _id, userType};

        // Send a json response containing the user object
        res.status(201).json({user: user});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Interval Server Error"})
    });
})


// POST  /auth/login - Verifies email and password and returns a JWT

router.post("/login", (req,res,next) => {
    const {email, password} = req.body;

    // Check if email or password are provided as empty string 
    if (email === "" || password === "") {
        res.status(400).json({message: "Please provide email and password."});
        return;
    }

    // Check the users collection if a user with the same email exists
    User.findOne({email})
        .then((foundUser) => {
            if (!foundUser) {
                // If the user is not found, send an error response
                res.status(401).json({message: "User not found."})
                return;
            }
            // Compare the provided password with the one saved in the database
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                // Deconstruct the user object to omit the password
                const { _id, email, name, userType} = foundUser;
                // Create an object that will be set as the token payload
                const payload = { _id, email, name, userType,"ut": userType==='admin'? 1: 0};
                // Create and Sign the token
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    {algorithm: 'HS256', expiresIn: "6h"}
                );

                //Send the token as the response 
                res.status(200).json({authToken: authToken});
            }
            else {
                res.status(401).json({message: "Unable to authenticate the user"});
            }

        })
        .catch (err => res.status(500).json({ message: "Internal Server Error" }))
})


//POST /user/verify
router.get('/verify', isAuthenticated, (req,res,next) => {
    console.log('req.payload', req.payload);
    res.status(200).json(req.payload);
});

router.get('/refresh', isAuthenticated, (req, res, next) => {
    const {_id} = req.payload
   
    User.findById(_id)
    .then(userInfo => {
      if (!userInfo) {
        return res.status(404).json({message:"not found"});
      }
  
      const {_id, email, name, userType} = userInfo
  
      const payload = { _id, email, name, userType, "ut": userType==='admin'? 1: 0};
    
      const authToken = jwt.sign( 
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: "6h" }
      );
    
      res.status(200).json({ authToken: authToken});
    })
    .catch(err => console.error(err))
  })

module.exports = router; 