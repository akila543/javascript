const triggers = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const async = require('async');
const initiatePipeline = require('../../../Pipeline/initiatePipeline.js');
const bodyParser = require('body-parser');
const transformPayload = require('../../lib/transformPayload');
const RedisClient = require('redis').createClient();
const triggerReportGenerator = require('../../lib/triggerReportGenerator');

//request parsers
triggers.use(bodyParser.json());
triggers.use(bodyParser.urlencoded({
  extended: true
}));

// Connection URL
var url1 = 'mongodb://localhost:27017/workflows';
var url2 = 'mongodb://localhost:27017/users';

//routes
triggers.post('/hooks/:triggerId',function(req,res,next){
  console.log(req.params.triggerId);
  next();
},function(req,res){
  async.waterfall([
    function(callback){
      MongoClient.connect(url2,function(err,db){
        if (err) {
          console.log(err);
        }
        else {
          db.collection('activities').find({user:req.body.repository.owner.login,repo:req.body.repository.url}).toArray(function(err,result){
            if (err) {
              console.log(err);
            }
            else {
              console.log(result[0].templateName);
                callback(null,result[0].templateName);
            }
      });
    }
  })
},
    function(template,callback){
      MongoClient.connect(url1,function(err,db){
        if (err) {
          console.log(err);
        }
        else {
          db.collection('templates').find({templateName:template}).toArray(function(err,result){
              if (err) {
                console.log(err);
              }
              else {
                console.log(result);
                transformPayload(result[0].transFunction,req.body,function(err,fpayload){
                  callback(null,fpayload,template);
                });
              }
          });
        }
      });//end of MongoClient
    },
    function(FinalPayload,template,callback){
      var input = {
          payload: FinalPayload,
          templateName: template
      };
      initiatePipeline(input,req.body.repository.owner.login, function(err,jobId,userName) {
          MongoClient.connect(url2, function(err, db) {
              if (err) {
                  console.log('---- DB connection error <<=== ' + err + ' ===>>');
              } else {
                  db.collection('activities').insertOne({
                      user: userName,
                      jobId: jobId,
                      triggerId: req.params.triggerId,
                      repo: req.body.repository.url,
                      initiatedAt: new Date(),
                      templateName: template,
                      status: "Initiated",
                      summary: "No summary yet"
                  }, function(err, result) {
                      if (err) {
                          console.log('---- DB add error <<=== ' + err + ' ===>>');
                      } else {
                          console.log("+-+- Report add status(+1-0) <<=== " + result.result.n + " ===>>");
                          callback(null,jobId,userName);
                          db.close();
                      }
                  }); // end of report
              }
          }); // end of MongoClient
      });
    },
    function(job,user,callback){
      triggerReportGenerator(job,user,function(err,result){
        if (err) {
          console.log(err);
        }
        else{
          res.send("got it");
          callback(null,result);
        }
      });
    }
  ],function(err,done){
    if (err) {
      console.log(err);
    }
    else{
      console.log('trigger output',done);
    }
  });//end of async
});//end of route

module.exports = triggers;
