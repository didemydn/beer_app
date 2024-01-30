// routes/beer.routes.js

const router = require("express").Router();

// const mongoose = require("mongoose");

const Beer = require("../models/Beer.model");

//  POST /api/beers  -  Creates a new beer
router.post("/beers", (req, res, next) => {
  const { brand,name, type, abv, description } = req.body;

  Beer.create({ brand, type, abv, description })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;
