const redis = require('redis');
var client= redis.createClient();

module.exports = function(jobId,resources,done){

  client.hmset(jobId+'_resources','WORKSPACE',resources,done);
}
