// routes/beer.routes.js

const router = require("express").Router();

// const mongoose = require("mongoose");

const Beer = require("../models/Beer.model");

const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const CommentRating = require("../models/CommentRating.model.js");

//  POST /api/beers  -  Creates a new beer
router.post("/create", fileUploader.single("beerImage"), (req, res) => {
  const { brand,name, type, abv, description } = req.body;
  const beerImage = req.file ? req.file.path : null;
  console.log("file is:", req.file);

  if (!beerImage) {
    return res.status(400).json({ error: "No photo uploaded!"});
  }

  Beer.create({ brand,beerImage, name, type, abv, description })
    .then((createdBeer) => {
        console.log("Beer created:", createdBeer);
    })
    .catch((error) => {
        console.log("Error creating beer:", error);
        res.status(500).json({ error: "Error creating beer" })
    });
});

//get all beers

router.get("/beers", isAuthenticated, (req,res) => {
    Beer.find()
      .then((beers) => {
        res.status(200).json(beers);
      })
      .catch((error) => {
        console.log("Error creating beer:", error)
        res.status(500).json({ error: "Error getting beer" })
      })
})

//get a single beer page 
router.get("/beers/:beerId", isAuthenticated, async (req,res)=> {
    try {
        const {beerId} = req.params;
        const {email} = req.payload;
        
        const singleBeer = await Beer.findById(beerId);
        if (!singleBeer) {
            res.status(404).json({ message: "Beer not found"});
        }

        const commentsAndRating = await CommentRating.find( {beer: beerId})
        .populate("user", ["name", "email"]);

        let averageRating = 0;
        let isUserRatedAndCommented = false;

        if (commentsAndRating.length > 0) {
            let totalRating = 0 
            commentsAndRating.forEach(commentsAndRating => {
                totalRating += commentsAndRating.rating
                if(commentsAndRating.user.email === email) {
                    isUserRatedAndCommented = true
                }
            })
            averageRating = totalRating / commentsAndRatings.length;   
        }
        res.status(200).json({singleBeer, commentsAndRatings, averageRating, isUserRatedAndCommented});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
});

module.exports = router;
