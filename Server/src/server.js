"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var cors = require("cors");
var database_1 = require("./database");
var user_routes_1 = require("./user.routes");
var bet_routers_1 = require("./bet.routers");
var odd_routers_1 = require("./odd.routers");
var express = require("express");
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
var URI = process.env.URI;
var PORT = process.env.PORT;
if (!URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
(0, database_1.connectToDatabase)(URI)
    .then(function () {
    var app = express();
    app.use(cors());
    // simple route
    app.get("/", function (req, res) {
        res.json({ message: "Welcome to betting application." });
    });
    app.use("/users", user_routes_1.userRouter);
    app.use("/odds", odd_routers_1.oddRouter);
    app.use("/bets", bet_routers_1.betRouter);
    // start the Express server
    app.listen(PORT, function () {
        console.log("Server running at http://localhost:".concat(PORT, "..."));
    });
})["catch"](function (error) { return console.error("error:", error); });
