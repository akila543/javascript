const redis = require('redis');
var client= redis.createClient(6379,'127.0.0.1');

module.exports = function updateStage(jobId,stageName,stageData,done){
  client.hmset(jobId+'_stages',stageName,stageData,done);
}
