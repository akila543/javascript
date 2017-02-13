const redis = require('redis');
var client= redis.createClient();

module.exports = function updateStage(jobId,stageName,stageData,done){
  client.hmset(jobId+'_stages',stageName,stageData,done);
}
