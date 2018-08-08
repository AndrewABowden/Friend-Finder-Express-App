//load data/friends.js array info for our survey answers
var friends = require('../data/friends.js');
var path = require('path');

var totalDiff = 0;
//routes come back as json
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
       
        var newestFriend = req.body;

        // compute closest
        var closeMatch = {};

              for(var i = 0; i < newestFriend.scores.length; i++) {
                if(newestFriend.scores[i] == "1 (Strongly Disagree)") {
                  newestFriend.scores[i] = 1;
                } else if(newestFriend.scores[i] == "5 (Strongly Agree)") {
                  newestFriend.scores[i] = 5;
                } else {
                  newestFriend.scores[i] = parseInt(newestFriend.scores[i]);
                }
              }
    
                var closeMatchDifference = 40;
                //Compares scores
                var closeMatchIndex = 0;
        
                for (var i = 0; i < friends.length; i++) {
                    console.log(friends[i].name);
                    var totalDiff = 0;
        
                    for (var index = 0; index < friends[i].scores.length; index++) {
                        var diffBetweenScore = Math.abs(friends[i].scores[index] - newestFriend.scores[index]);
                        totalDiff += diffBetweenScore;
                    }
                    if (totalDiff < closeMatchDifference) {
                        closeMatchIndex = i;
                        closeMatchDifference = totalDiff;
                    }
                }
        
                // the close match index is used to get the closest match data from the friends index
                closeMatch = friends[closeMatchIndex];
                friends.push(newestFriend); //add to array database
                res.json(closeMatch); //gives close match
                console.log(newestFriend);
            });

        };
        
        

/*
                 // newestFriend is new survey participant
        // var newestFriend = req.body;

        // compute closest
        var closeMatch = {
            name: "",
            image: "",
            closeMatchDifference: 1000
        };

        var userData = req.body
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        var totalDiff = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDiff = 0;


            //loop through friends score and user score and calc difference
            for (var j = 0; j < 10; j++) {
                totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDiff <= closeMatch.friendDiff) {
                    closeMatch.name = friends[i].name;
                    closeMatch.photo = friends[i].photo;
                    closeMatch.closeMatchDifference = totalDiff;
                }
            }
        }
        friends.push(userData); //add to array database
        res.json(closeMatch); //gives close match
        console.log(userData);
    });

};


*/