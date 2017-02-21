//module imports
const getOneWorkflow = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

//use a middleware
getOneWorkflow.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

//router
getOneWorkflow.get('/workflows/workflow',function(req,res,next){
  //retrieveAll request
  console.log("++++ Workflow retrieve request <<=== " + JSON.stringify(req.body) + " ===>>");
  next();
},function(req,res){
  //retrieving all workflows from db
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log('---- DB connection error <<=== ' + err + ' ===>>');
    }
    else{
      db.collection('templates').findOne({templateName:req.body.templateName},function(err,result){
        if (err) {
          console.log('---- DB retrieveOne error <<=== ' + err + ' ===>>');
        }
        else {
          console.log("+-+- Workflow retrieveOne output <<=== " + JSON.stringify(result) + " ===>>");
          res.send(result);
          db.close();
        }
      });//end of retrieveOne
    }
  });// end MongoClient
});// end of router

module.exports = getOneWorkflow;
