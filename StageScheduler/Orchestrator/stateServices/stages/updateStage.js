const redis = require('redis');
var client= redis.createClient();

module.exports = function updateStage(jobId,stageName,stageData,done){
  console.log("inside update state service");
  client.hmset(jobId+'_stages',stageName,stageData,done);
}
