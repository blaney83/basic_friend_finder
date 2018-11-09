// Dependencies
var data = require("../data/friends")

// Displays all characters
function apiRoutes(app) {
    app.get("/api/friends", function (req, res) {
        console.log("listening at get")
        return res.json(data);
    });

    app.post("/api/friends", function (req, res) {
        //variable for the index of your best friend
        let friendIndex = 0;
        //variable to store the highest compatibility score
        let curHighCompatibility = 0;
        //array to hold your newly submitted scores
        let scores = req.body.scores.map(Number);




        let promise1 = new Promise(function (resolve, reject) {
            //loop through all your potential best friends
            data.friends.forEach(function (obj, ind) {
                //array to hold your interpreted compatibility values
                let scoreAdder = [];
                //variable to allow the index of current potential friend to be held in an object
                let friendNum = ind;
                //loop the length of the scores being compared. Each time the i is increased by one, functions will examine the next question for both players
                for (i = 0; i < scores.length; i++) {
                    //if your score for question 1 is equal to the current potential friends answer to question one, then add the highest possible value to score adder. Each successive check assigns lower compatibility scores for a higher difference between the answers.
                    if (scores[i] === data.friends[friendNum].scores[i]) {
                        scoreAdder.push(5)
                    } else if (Math.abs(scores[i] - data.friends[friendNum].scores[i]) === 1) {
                        scoreAdder.push(4)
                    } else if (Math.abs(scores[i] - data.friends[friendNum].scores[i]) === 2) {
                        scoreAdder.push(3)
                    } else if (Math.abs(scores[i] - data.friends[friendNum].scores[i]) === 3) {
                        scoreAdder.push(2)
                    } else if (Math.abs(scores[i] - data.friends[friendNum].scores[i]) === 4) {
                        scoreAdder.push(1)
                    }
                };

                function getSum(total, num) {
                    return total + num;
                }
                //temporary viable that is eqyal to the sum of all composite compatibility scores
                let currFriendScore = scoreAdder.reduce(getSum);
                console.log("Your compatibility score with " + data.friends[friendNum].name + " is " + currFriendScore)
                //if that temp variable is higher than the current running high, then we will set the running high to the new value and then set the current best friend index equal to the current potential friend object's index
                if (currFriendScore > curHighCompatibility) {
                    curHighCompatibility = currFriendScore;
                    friendIndex = friendNum;
                };
            })
            //parse the scores that are currently stored as strings into numbers and change the actual array inside the req.body so that the posted data is changed
            req.body.scores = req.body.scores.map(Number);
            //then push the data to the db, but make sure this step is in the promise because otherwise the algorithm will return "you", the current user as the match becasue it push your info to the db before running the algorithm, thereby finding "yourself" as a perfect match (because all scores will match)
            data.friends.push(req.body);

            resolve("done")
        })

        promise1.then(function (value) {
            res.json(data.friends[friendIndex])
        })
    })

}
module.exports = {
    apiRoutes: apiRoutes,
}