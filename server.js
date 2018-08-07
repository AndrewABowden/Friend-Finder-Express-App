// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

var path = require('path');

// var htmlRoutes = require('./app/routing/html-routing');
// var apiRoutes = require('./app/routing/api-routing');


//seeds data for database
var friends = require('./app/data/friends.js');

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); //what does this do

app.use(express.static('app/public'));

//Routing
require(path.join(__dirname,'./app/routing/api-routing.js'))(app);
require(path.join(__dirname,'./app/routing/html-routing.js'))(app);

//start server listening
app.listen(PORT, function(){
    console.log(process.env.port || 3000);

});


