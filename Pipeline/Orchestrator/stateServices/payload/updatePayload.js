const redis = require('redis');
var client= redis.createClient(6379,'127.0.0.1');

module.exports=function(jobId,payload,done){
  client.set(jobId+'_payload',payload,function(err,res)
  {
    done(err,res);
  });
}
