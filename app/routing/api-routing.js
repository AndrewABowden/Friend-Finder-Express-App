//load data/friends.js array info for our survey answers
var friends = require('../data/friends.js');

//routes come back as json
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
        if(err) {
            console.log(err)
        } 
    
    });

    app.post('/api/friends', function (req, res) {
        // newFriend is the user that filled out the survey
        var newUser = req.body;
       // compute best match from scores
        var closeMatch = {};
          for (var j = 0; j < newUser.scores.length; j++) {
            if (newUser.scores[j] == "1 (Strongly Disagree)") {
                newUser.scores[j] = 1;
            } else if (newUser.scores[j] == "5 (Strongly Agree)") {
                newUser.scores[j] = 5;
            } else {
                newUser.scores[j] = parseInt(newUser.scores[j]);
            }
        }
        var closeMatchIndex = 0;
        var closeMatchDifference = 40;
        for (var x = 0; x < friends.length; x++) {
            var totalDiff = 0;

            for (let x = 0; index < friends[x].scores.length; index++) {
                var diffBetweenScore = Math.abs(friends[x].scores[index] - newUser.scores[index]);
                totalDiff += diffBetweenScore;
            }
            if (totalDiff < closeMatchDifference) {
                closeMatchIndex = x;
                closeMatchDifference = totalDiff;
            }
        }

        // the best match index is used to get the best match data from the friends index
        closeMatch = friends[closeMatchIndex];

        // Pput newUser into array 
        friends.push(newUser);

        // return the best match friend
        res.json(closeMatch);
    });

};