const redis = require('redis');
const async = require('async');
const updateStage = require('./stateServices/stages/updateStage');
const retrieveStage = require('./stateServices/stages/retrieveStage');
const updatePayload = require('./stateServices/payload/updatePayload');
const retrievePayload = require('./stateServices/payload/retrievePayload');
//client
var resultsProcessor = redis.createClient();
//updateRedis --> stages and payload
function updateRedis(result,cb){
  console.log("update redis========");
  var status;
  var output;
  var jobId=result.jobId;
  var stageName=result.stageName;
  var stdout= result.stdout;
  var stderr= result.stderr;
  var exitCode= result.exitCode;
  var ts_completed= new Date();
  if(exitCode=== 0){
    status='Complete';
    output=stdout;
  }
  else{
    status='Failed';
    output=stderr;
  }


  //retrieving and updating stage
  retrieveStage(jobId, stageName,function(err,res){
    if (err) {
      console.log(err);
    }
    else {
      console.log(res);
      var stage = JSON.parse(res);
      stage.status=status;
      stage.stdout=stdout;
      stage.stderr=stderr;
      stage.exitCode=exitCode;
      stage.ts_completed=ts_completed;
      stage.output=output;
      updateStage(jobId,stageName,JSON.stringify(stage),function(err,res){
        if (err) {
          console.log(err);
        }
        else {
          //retrieving and updating payload
          retrievePayload(jobId,function(err,res){
            if (err) {
              console.log(err);
            }
            else {
              var payload = JSON.parse(res);
              payload[stageName]=output;
              updatePayload(jobId,JSON.stringify(payload),function(err,res){
                if (err) {
                  console.log(err);
                }
                else {
                  cb();
                }
              });
            }
          });
        }
      });
    }
  });
}

//pushing back to the JOB_SCHEDULAR queue
function pushBack(jobId,callback){
  resultsProcessor.lpush('JOB_SCHEDULER',jobId,function(err,reply){
    if(err){
      console.log(err);
    }
    else {
      callback();
    }
  });
}

//module exports
module.exports = function(message,cb){
        //processing the result
        console.log('result processor=========');
        var result=JSON.parse(message);
        updateRedis(result,function(){
              pushBack(result.jobId,cb);
            });
      };
