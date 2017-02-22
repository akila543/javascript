const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/users";

module.exports = function(user,jobId,status,callback){
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      db.collection('activities').updateOne({user:user,jobId:jobId},{$set:{status:status}},(function(err,reply){
          if (err) {
            console.log(err);
          }
          else {
            console.log(reply);
            callback();
          }
      });//end of findall
    }
  });//end of mongoclient
}
