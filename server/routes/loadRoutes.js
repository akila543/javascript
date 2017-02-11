var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var result = require('./results.js');

app.use(express.static('./'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/',function(req,res,next){
	console.log('root route====>'+req.body);
	next();
},result);


app.listen(3000);

module.exports = app;