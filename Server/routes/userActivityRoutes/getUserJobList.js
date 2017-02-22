const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/users";

module.exports = function(user,repo,callback){
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      db.collection('activities').findAll({user:user,repo:repo}).toArray(function(err,docs){
          if (err) {
            console.log(err);
          }
          else {
            console.log(docs.length);
            callback(docs);
          }
      });//end of findall
    }
  });//end of mongoclient
}
