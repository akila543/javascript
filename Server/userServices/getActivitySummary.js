const MongoClient = require('mongodb').MongoClient;
const RedisClient = require('redis').createClient();

//mongo url
var url = "mongodb://localhost:27017/users";

module.exports = function(user,done){
  MongoClient.connect(url,function(err,db){
    if (err) {
      console.log(err);
    }
    else{
      db.collection('profiles').findOne({userName:user},function(err,profile){
        
      });
    }
  });

};
