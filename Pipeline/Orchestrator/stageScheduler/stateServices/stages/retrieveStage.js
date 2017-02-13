var redis = require("redis")
var client = redis.createClient();

module.exports = function(jobId,stageName,done){
			 client.hmget(jobId+'_stages',stageName,done);
};
