const UJobList = require('express').Router();
UJobList.use(require('body-parser').json());
const MongoClient = require('mongodb').MongoClient;


var url = "mongodb://localhost:27017/users";

UJobList.post('/userjoblist', function(req, res, next) {
	console.log('get user joblist',req.body);
	MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      db.collection('activities').find({user:req.body.user,repo:req.body.repoUrl}).toArray(function(err,docs){
          if (err) {
            console.log(err);
          }
          else {
            console.log(docs.length);
            res.send(docs);
          }
      });//end of findall
    }
  });//end of mongoclient

})
module.exports = UJobList;
