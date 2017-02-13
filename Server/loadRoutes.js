var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var result = require('./results.js');

app.use(express.static('Client/'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
// });

app.use('/',function(req,res,next){
	console.log("got routed");
	next();
},result);


app.listen(3000,console.log("server is running"));

module.exports = app;
