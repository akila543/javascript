const MongoClient = require('mongodb').MongoClient;

//db connection url
var url = 'mongodb://localhost:27017/users';

function addUser(id,user,details,loginTime,callback){
  MongoClient.connect(url,function(err,db){
    if (err) {
      console.log(err);
    }
    else {
      db.collection('profiles').find({id:id}).toArray(function(err,docs){
        if (err) {
          console.log(err);
        }
        else{
          if (docs.length>0) {
            console.log('Existing User');
            callback();
          }
          else{
            db.collection('profiles').insertOne({id:id,userName:user,githubinfo:details,loggedinAt:loginTime},function(err,r){
              console.log(r.insertedCount);
              callback();
            });
          }
        }
      });//end of find
    }
  });//end of MongoClient
}

module.exports = addUser;
