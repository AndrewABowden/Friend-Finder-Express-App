var path = require('path');

//routes 
module.exports = function(app) {
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '/../public/home.html'));
    });

    //survey.html route
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/survey.html'))
    });

    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'))
    });

};