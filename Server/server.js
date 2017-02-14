const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const result = require('./routes/results');
const saveFile = require('./routes/fileSave');
const stageLister = require('./routes/stageList');
const deleteWorkflow = require('./routes/deleteWorkflow');
const jobList = require('./routes/loadJobList');

//request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//static file service
app.use(express.static('../Client/'));

//routes list
app.use('/',function(req,res,next){
	console.log("got routed");
	next();
},result,saveFile,stageLister,deleteWorkflow,jobList);

//server run
app.listen(3000,console.log("Server is running on port 3000..."));

module.exports = app;
