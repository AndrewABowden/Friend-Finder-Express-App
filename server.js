// Dependencies
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

//seeds data for database
var friends = require('./app/data/friends.js');
console.log(friends);
// Create express app instance.
var app = express();
var PORT = process.env.PORT || 3000;
// 
app.use(express.static('app/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); //what does this do

//Routing
// var htmlRoutes 
require(path.join(__dirname,'./app/routing/html-routing.js'))(app);
// var apiRoutes 
require(path.join(__dirname,'./app/routing/api-routing.js'))(app);
//seeds data for database

// Routes
// app.use('/', htmlRoutes);
// // app.use('/survey.html', htmlRoutes);
// app.get('/api/friends', apiRoutes);
// app.post('/api/friends', apiRoutes);

//start server listening
app.listen(PORT, function(){
    console.log(process.env.port || 3000);
});

// Export connection


