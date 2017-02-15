//module imports
const getWorkflows = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
//use a middleware
getWorkflows.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

getWorkflows.get('/workflows',function(req,res,next){
  console.log(req.body);
  next();
},function(req,res,next){
  //connect to mongodb
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log('could not connect to mongodb');
    }
    else{
      console.log('connected');
      var templates = db.collection('templates');
      templates.find({}).toArray(function(err,result){
        if (err) {
          console.log(err);
        }
        else {
          res.send(result);
          db.close();
        }
      });
    }
  });
}
);

module.exports = getWorkflows;
