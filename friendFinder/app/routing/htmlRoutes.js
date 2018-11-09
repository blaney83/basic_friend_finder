
var path = require("path");

function htmlRoutes(app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    
    app.get("/burrito", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/script.js"));
    });
}

module.exports = {
    htmlRoutes: htmlRoutes,
}