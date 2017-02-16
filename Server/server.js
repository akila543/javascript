const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const results = require('./routes/results');
const saveFile = require('./routes/fileSave');
const stageLister = require('./routes/stageList');
const deleteWorkflow = require('./routes/deleteWorkflow');
const jobList = require('./routes/loadJobList');
const updateWorkflow = require('./routes/updateWorkflow');
const getWorkflows = require('./routes/getWorkflows');
const authentication = require('./routes/authentication.js');



//request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//response headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//test get request
app.get('/test',function(req,res,next){
  console.log(req.fresh);
  setTimeout(()=>{
    res.send('<h1>got it</h1>');
  },120000);
  next();
});

//static file service
app.use(express.static('../Client/'));

//routes list
app.use('/',function(req,res,next){
	console.log("into the routes...");
	next();
},authentication,results,saveFile,stageLister,deleteWorkflow,jobList,updateWorkflow,getWorkflows);

//server run
app.listen(3000,console.log("Server is listening on port 3000..."));

module.exports = app;
