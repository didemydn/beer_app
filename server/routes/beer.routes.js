// routes/beer.routes.js
const router = require("express").Router();
// const mongoose = require("mongoose");
const Beer = require("../models/Beer.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  POST /beer/create  -  Creates a new beer
router.post("/create", fileUploader.single("beerImage"), (req, res) => {
  const { brand, name, abv, country, description } = req.body;
  const beerImage = req.file ? req.file.path : null;
  console.log("file is:", req.file);

  if (!beerImage) {
    return res.status(400).json({ error: "No photo uploaded!"});
  }

  Beer.create({ brand, beerImage, name, country, abv, description })
    .then((createdBeer) => {
        console.log("Beer created:", createdBeer);
    })
    .catch((error) => {
        console.log("Error creating beer:", error);
        res.status(500).json({ error: "Error creating beer" })
    });
});

//get all beers

router.get("/all", (req,res) => {
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
router.get("/all/:beerId", isAuthenticated, async (req,res)=> {
    try {
        const {beerId} = req.params;
        const {email} = req.payload;
        
        const singleBeer = await Beer.findById(beerId);
        if (!singleBeer) {
            res.status(404).json({ message: "Beer not found"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
});

module.exports = router;
