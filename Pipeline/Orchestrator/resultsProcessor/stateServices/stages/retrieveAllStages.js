const redis = require ('redis');
var client = redis.createClient();

module.exports=function(jobId,done)
{
  client.hgetall(jobId+'_stages',done);
}
