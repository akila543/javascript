var redis = require("redis")
var client = redis.createClient(6379,'127.0.0.1');

module.exports = function(jobId,stageName,done){
			 client.hmget(jobId+'_stages',stageName,function(err,reply){
          done(err,reply);
        });
};
