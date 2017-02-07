const redis = require('redis');
var client=redis.createClient(6379,'127.0.0.1');

module.exports=function(jobId,done)
{
  client.hgetall(jobId+'_resources',done);
}
