//module imports
const getAllWorkflows = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

//use a middleware
getAllWorkflows.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

//router
getAllWorkflows.get('/workflows',function(req,res,next){
  //retrieveAll request
  console.log("++++ Workflow retrieveAll request <<=== " + JSON.stringify(req.body) + " ===>>");
  next();
},function(req,res){
  //retrieving all workflows from db
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log('---- DB connection error <<=== ' + err + ' ===>>');
    }
    else{
      db.collection('templates').find({}).toArray(function(err,result){
        if (err) {
          console.log('---- DB retrieveAll error <<=== ' + err + ' ===>>');
        }
        else {
          console.log("+-+- Workflow retrieveAll output <<=== " + JSON.stringify(result) + " ===>>");
          res.send(result);
          db.close();
        }
      });//end of retrieveAll
    }
  });// end MongoClient
});// end of router

module.exports = getAllWorkflows;
