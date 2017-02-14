const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const result = require('./routes/results');
const saveFile = require('./routes/fileSave');
const jobList = require('./routes/loadJobList');

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
},result,saveFile,jobList);

app.listen(3000,console.log("server is running"));

module.exports = app;
