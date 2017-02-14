var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var result = require('./routes/results');
var saveFile = require('./routes/fileSave');

//request parsers
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

//static file service
app.use(express.static('../Client/'));

app.use('/',function(req,res,next){
	console.log("got routed");
	next();
},result,saveFile);

// app.use('/',function(req,res,next){
// 	console.log("saveFile");
// 	next();
// },saveFile);

app.listen(3000,console.log("server is running"));

module.exports = app;
