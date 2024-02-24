const User = require("../models/User.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post(
    "/upload/:id",fileUploader.single("profileImage"),
    (req,res,next) => {
        console.log("file is:", req.file);
        if(!req.file) {
            next(new Error("no photo uploaded"));
            return;
        }
        res.json({ fileUrl: req.file.path});
    }
)

router.put("/edit/:id", (req, res) => {
    const userId = req.params.id;
    const { name, password, profileImage } = req.body;

    const updatedForm = { name, password, profileImage };
    User.findByIdAndUpdate(userId, updatedForm, {new: true})
    .then((updatedInfo) => {
        if(!updatedInfo) {
            return res.status(404).json({message: "not found"});
        }
        res.json( {updatedInfo});
    })
    .catch((err) => console.error(err));
    
});

module.exports = router;



