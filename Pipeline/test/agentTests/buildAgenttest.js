//module imports
const redis = require('redis');

//input payload for stage processing
var stage_payload1 = {
  jobId: 'jobId1',
  stageName: 'build',
  cmd: '/stackroute/javascript/build',
  input:{
    WORKSPACE: '/tmp/jobId1',
  }
};

var stage_payload2 = {
  jobId: 'jobId2',
  stageName: 'gitClone',
  cmd: '/stackroute/git/clone',
  input:{
    REPO_URL: 'https://github.com/rsunray/ciserver',
    BRANCH: 'refs/heads/master',
    WORKSPACE: '/tmp/jobId2',
  }
};

var stage_payload3 = {
  jobId: 'jobId3',
  stageName: 'gitClone',
  cmd: '/stackroute/git/clone',
  input:{
    REPO_URL: 'https://github.com/rsunray/ciserver',
    BRANCH: 'refs/heads/master',
    WORKSPACE: '/tmp/jobId3',
  }
};

//create an EventEmitter
var emitter = new EventEmitter();

//adding stage payload to the worker queue
var stageScheduler = redis.createClient(6379,'127.0.0.1');

stageScheduler.lpush('stackroute/build',JSON.stringify(stage_payload1),JSON.stringify(stage_payload2),JSON.stringify(stage_payload3),(err,reply)=>{
  if(err){
    console.log(err);
  }
  else {
    console.log(reply);
  }
});

function resultsTest(){
stageScheduler.brpop('results',0,(err,reply)=>{
  if (err) {
    console.log(err);
  }
  else {
    console.log(reply);
    setTimeout(function(){
      resultsTest();
    },0)
  }
});
};

resultsTest();
