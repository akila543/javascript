const redis = require('redis');
var client= redis.createClient();

module.exports=function(jobId,payload,done){
  client.set(jobId+'_payload',payload,done);
}
