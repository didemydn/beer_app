// ℹ️ Gets access to environment variables/settings

const { isAuthenticated } = require("./middleware/jwt.middleware");

// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const beerRouter = require("./routes/beer.routes");
app.use("/beer", beerRouter);

const userRouter = require("./routes/auth.routes");
app.use("/user", userRouter);

const profileRouter = require("./routes/profile.routes");
app.use("/profile", profileRouter);

//const profileRouter = require("./routes/profile.routes");
//app.use("/profile", profileRouter);

const commentRatingRouter = require("./routes/comment-rating.routes");
app.use("/comment-rating", commentRatingRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
