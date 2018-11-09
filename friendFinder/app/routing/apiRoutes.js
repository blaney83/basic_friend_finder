// Dependencies
// =============================================================
var data = require("../data/friends")

// Sets up the Express App
// =============================================================

// Displays all characters
function apiRoutes(app) {
    app.get("/api/friends", function (req, res) {
        console.log("listening at get")
        return res.json(data);
    });

    app.post("/api/friends", function(req, res){

    })




}
module.exports = {
    apiRoutes: apiRoutes,
    // apiPost : apiPost
}