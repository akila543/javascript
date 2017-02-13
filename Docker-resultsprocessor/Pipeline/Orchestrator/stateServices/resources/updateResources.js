const redis = require('redis');
var client= redis.createClient(6379,'172.23.238.179');

module.exports = function(jobId,resources,done){

  client.hmset(jobId+'_resources','WORKSPACE',resources,done);
}
