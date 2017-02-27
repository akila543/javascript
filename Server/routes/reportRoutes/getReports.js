const getReports = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
//request parsers
getReports.use(bodyParser.json());
getReports.use(bodyParser.urlencoded({
  extended: true
}));

var url = 'mongodb://localhost:27017/reports';

getReports.get('/getreports/:jobId', function(req,res,next){
  console.log(req.params);
  next();
},function(req,res){
  MongoClient.connect(url,function(err,db){
    if (err) {
      console.log(err);
    }
    else{
      db.collection('buildreports').find({jobId:req.params.jobId}).toArray(function(err,result){
        if (err){
          console.log(err);
        }
        else{
          res.send(result);
        }
      });
    }
  });
});

module.exports = getReports;
