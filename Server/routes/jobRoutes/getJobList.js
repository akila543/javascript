const rediscli = require('redis').createClient();
const async = require('async');
const getJobList = require('express').Router();
getJobList.use(require('body-parser').json());

getJobList.post('/joblist',function(req,res){
    rediscli.lrange('JOBLIST', 0, -1, (err, jobs) => {
        if (err) {
            console.log(err);
        } else {
          console.log(jobs);
            async.series(jobs.map((job) => {
                return getJobListFromRedis.bind(null, job);
            }),function(err,result){
              if (err) {
                console.log(err);
              }
              else {
                res.send(result);
              }
            });
        }
    });
});

function getJobListFromRedis(job, callback) {
    rediscli.hmget(job, 'status', function(err, reply) {
        if (err) {
            console.log(err);
        } else {
            callback(null, {jobId:job,status:reply});
        }
    });

};

module.exports = getJobList;
