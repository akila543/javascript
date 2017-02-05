const redis = require('redis');
const async = require('async');

//creating client
var stageScheduler = redis.createClient(6379, '127.0.0.1');
var retrievePayload = require('./stateServices/payload/retrievePayload');
var retrieveStage = require('./stateServices/stages/retrieveStage');
var retrieveResources = require('./stateServices/resources/retrieveResources');
var updateStage = require('./stateServices/stages/updateStage');

//Updating status and ts_scheduled for stage
function updateStatus(jobId, stageName, callback) {
    retrieveStage(jobId, stageName,function(err,res){
      if (err) {
        console.log(err);
      }
      else {
        var stages = JSON.parse(res);
        var comand = stages.type;
        var status = stages.status;
        var input = stages.input;
        if (status == "Initialized") {
            stages.status = "Scheduled";
            //updating status and ts_scheduled in redis
            stages.ts_scheduled = new Date();
            updateStage(jobId, stageName, JSON.stringify(stages),function(err,res){
              if (err) {
                console.log(err);
              }
              else {
                schedule(jobId, stageName, input, comand, callback);
              }
            });
        }
      }
    });
}

function schedule(jobId, stageName, input_stages, comand, callback) {
    var temparr = comand.split('/');
    var queueName = temparr[0] + '/' + temparr[1];
    if (comand === "stackroute/git/clone") {
        retrievePayload(jobId,function(err,res){
          if (err) {
            console.log(err);
          }
          else {
              var input = res;
              var payload = JSON.parse(input);
              var author = payload["author"];
              var repo = payload["repo"];
              var branch = payload["branch"];

              //creating input payload for stageSchedular
              retrieveResources(jobId,function(err,res){
                if (err) {
                  console.log(err);
                }
                else {
                  var workspace = res;
                  var stage_payload = {
                      jobId: jobId,
                      stageName: stageName,
                      cmd: comand,
                      input: {
                          REPO_URL: "https://github.com/" + author + "/" + repo,
                          BRANCH: branch,
                          WORKSPACE: workspace
                      }
                  };
                  stageScheduler.lpush(queueName, JSON.stringify(stage_payload), (err, reply) => {
                      if (err) {
                          console.log(err);
                      } else {
                          callback();
                      }
                  });
                }
              });
          }
        });
    }
    else {
      retrieveResources(jobId,function(err,res){
        if (err) {
          console.log(err);
        }
        else {
          var workspace = res;
          if (input_stages === null) {
            console.log('Code-review is Scheduled.');
            callback();
          }
          else{
            input_stages.WORKSPACE = workspace;
            var stage_payload = {
                jobId: jobId,
                stageName: stageName,
                cmd: comand,
                input: input_stages
            };
            stageScheduler.lpush(queueName, JSON.stringify(stage_payload), (err, reply) => {
                if (err) {
                    console.log(err);
                } else {
                    callback();
                }
            });
          }
        }
      });
    }
}
//popping message from STAGE_SCHEDULAR queue
module.exports = function(reply, callback) {
    jobId = JSON.parse(reply).jobId;
    stageName = JSON.parse(reply).stageName;
    console.log(stageName);
    updateStatus(jobId, stageName, callback);
};
