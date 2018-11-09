
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var data = require("./app/data/friends")
let apiRoutes = require("./app/routing/apiRoutes")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/script.js"));
});

apiRoutes.apiRoutes(app);

// app.get("/api/friends", function (req, res) {
//     console.log("listening at get")
//     return res.json(data);
// });

// apiRoutes;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
