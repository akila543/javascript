const redis = require('redis');
//creating client

var client=redis.createClient();

module.exports=function(jobId,done)
{
  client.get(jobId+'_payload',done);
}
