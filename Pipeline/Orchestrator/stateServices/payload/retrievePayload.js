const redis = require('redis');
//creating client

var client=redis.createClient(6379,'127.0.0.1');

module.exports=function(jobId,done)
{
  client.get(jobId+'_payload',function(err, results) {
      done(err,results);
  });
}
